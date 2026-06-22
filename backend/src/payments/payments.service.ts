import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { randomUUID } from 'crypto';

interface CreateDonationDto {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  companyId?: string;
}

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async createDonation(dto: CreateDonationDto) {
    const shopId = this.config.get<string>('YUKASSA_SHOP_ID');
    const secretKey = this.config.get<string>('YUKASSA_SECRET_KEY');
    const frontendUrl = this.config.get<string>('FRONTEND_URL', 'https://fishopt.pro');

    if (!shopId || !secretKey) {
      throw new InternalServerErrorException('ЮКасса не настроена');
    }

    if (!dto.amount || dto.amount < 10) {
      throw new BadRequestException('Минимальная сумма — 10 ₽');
    }

    // Save donation record with pending status
    const donation = await this.prisma.donation.create({
      data: {
        amount: dto.amount,
        donorName: dto.donorName,
        donorEmail: dto.donorEmail,
        companyId: dto.companyId,
        description: `Поддержка Fishopt${dto.donorName ? ` от ${dto.donorName}` : ''}`,
      },
    });

    // Create payment in YuKassa
    const response = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: dto.amount.toFixed(2),
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: `${frontendUrl}/support?donated=1&id=${donation.id}`,
        },
        capture: true,
        description: donation.description,
        metadata: {
          donationId: donation.id,
          companyId: dto.companyId ?? null,
        },
      },
      {
        auth: { username: shopId, password: secretKey },
        headers: {
          'Idempotency-Key': randomUUID(),
          'Content-Type': 'application/json',
        },
      },
    ).catch((err) => {
      throw new InternalServerErrorException(
        `ЮКасса: ${err.response?.data?.description ?? err.message}`,
      );
    });

    // Save yukassaId
    await this.prisma.donation.update({
      where: { id: donation.id },
      data: { yukassaId: response.data.id },
    });

    return { paymentUrl: response.data.confirmation.confirmation_url };
  }

  async handleWebhook(body: any) {
    if (body?.event !== 'payment.succeeded' && body?.event !== 'payment.canceled') {
      return { ok: true };
    }

    const payment = body.object;
    const donationId = payment?.metadata?.donationId;
    if (!donationId) return { ok: true };

    const status = body.event === 'payment.succeeded' ? 'succeeded' : 'canceled';

    await this.prisma.donation.updateMany({
      where: { id: donationId },
      data: {
        status,
        yukassaId: payment.id,
        confirmedAt: status === 'succeeded' ? new Date() : null,
      },
    });

    return { ok: true };
  }

  async getDonations() {
    return this.prisma.donation.findMany({
      where: { status: 'succeeded' },
      orderBy: { confirmedAt: 'desc' },
      include: { company: { select: { id: true, name: true, slug: true } } },
    });
  }
}
