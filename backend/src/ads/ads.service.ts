import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdsQueryDto, CreateAdDto } from './ads.dto';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: AdsQueryDto) {
    const { type, category, region, q } = query;
    const where: any = {
      expiresAt: { gte: new Date() },
    };
    if (type) where.type = type;
    if (category) where.category = { contains: category, mode: 'insensitive' };
    if (region) where.region = { contains: region, mode: 'insensitive' };
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    return this.prisma.ad.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      include: { company: { select: { slug: true, name: true } } },
    });
  }

  async findById(id: string) {
    const ad = await this.prisma.ad.findUnique({
      where: { id },
      include: { company: { select: { slug: true, name: true, phone: true } } },
    });
    if (!ad) throw new NotFoundException('Объявление не найдено');
    return ad;
  }

  async create(userId: string, dto: CreateAdDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.companyId) throw new ForbiddenException('Нет привязанной компании');

    const expiresAt = dto.expiresAt
      ? new Date(dto.expiresAt)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return this.prisma.ad.create({
      data: {
        companyId: user.companyId,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        category: dto.category,
        region: dto.region,
        price: dto.price,
        quantity: dto.quantity,
        contactName: dto.contactName,
        phone: dto.phone,
        expiresAt,
      },
    });
  }

  async delete(id: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const ad = await this.prisma.ad.findUnique({ where: { id } });
    if (!ad) throw new NotFoundException();
    if (ad.companyId !== user?.companyId && user?.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    return this.prisma.ad.delete({ where: { id } });
  }

  async myAds(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.companyId) return [];
    return this.prisma.ad.findMany({
      where: { companyId: user.companyId },
      orderBy: { publishedAt: 'desc' },
    });
  }
}
