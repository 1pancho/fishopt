import { Controller, Post, Get, Body, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  /** Создать платёж — возвращает { paymentUrl } */
  @Post('donate')
  async donate(
    @Body() body: { amount: number; donorName?: string; donorEmail?: string; companyId?: string },
  ) {
    return this.payments.createDonation(body);
  }

  /** Webhook от ЮКассы — подтверждение оплаты */
  @Post('webhook')
  @HttpCode(200)
  async webhook(@Body() body: any) {
    return this.payments.handleWebhook(body);
  }

  /** Список успешных донатов (для дашборда) */
  @Get('donations')
  async donations() {
    return this.payments.getDonations();
  }
}
