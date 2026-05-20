import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';
import { MailService } from '../mail/mail.service';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email уже зарегистрирован');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    let slug = slugify(dto.name);
    const existing_slug = await this.prisma.company.findUnique({ where: { slug } });
    if (existing_slug) slug = `${slug}-${Date.now()}`;

    const company = await this.prisma.company.create({
      data: {
        slug,
        name: dto.name,
        region: dto.region,
        inn: dto.inn,
        city: dto.city,
        activityTypes: dto.activityTypes ?? [],
        categories: dto.categories ?? [],
        phone: dto.phone,
        website: dto.website,
        description: dto.description,
      },
    });

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        companyId: company.id,
      },
    });

    return this.signToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { company: true },
    });
    if (!user) throw new UnauthorizedException('Неверный email или пароль');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Неверный email или пароль');

    return this.signToken(user.id, user.email);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    // Всегда отвечаем успехом — не раскрываем, зарегистрирован ли email
    if (!user) return { message: 'Если email зарегистрирован, письмо отправлено' };

    // Удаляем старые токены этого пользователя
    await this.prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 час

    await this.prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    try {
      await this.mail.sendPasswordReset(user.email, token);
    } catch (err) {
      // Логируем ошибку отправки, но не роняем запрос — токен уже сохранён
      this.logger.error(`Failed to send password reset email to ${user.email}: ${err}`);
    }

    return { message: 'Если email зарегистрирован, письмо отправлено' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const record = await this.prisma.passwordResetToken.findUnique({
      where: { token: dto.token },
    });

    if (!record) throw new BadRequestException('Ссылка недействительна');
    if (record.usedAt) throw new BadRequestException('Ссылка уже использована');
    if (record.expiresAt < new Date()) throw new BadRequestException('Ссылка истекла');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    await this.prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    await this.prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });

    return { message: 'Пароль успешно изменён' };
  }

  private async signToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    const token = await this.jwt.signAsync(payload);
    return { access_token: token };
  }
}
