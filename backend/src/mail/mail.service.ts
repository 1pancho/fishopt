import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private config: ConfigService) {}

  async sendPasswordReset(to: string, token: string): Promise<void> {
    const frontendUrl = this.config.get<string>('FRONTEND_URL', 'https://fishopt.pro');
    const from = this.config.get<string>('MAIL_FROM', 'info@fishopt.pro');
    const apiKey = this.config.get<string>('UNISENDER_API_KEY', '');
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

    const html = `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;max-width:520px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#0c4a6e;padding:28px 36px;">
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Fishopt</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 28px;">
            <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#0f172a;">Сброс пароля</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
              Мы получили запрос на сброс пароля для вашего аккаунта на Fishopt.
              Нажмите кнопку ниже, чтобы задать новый пароль.
            </p>
            <a href="${resetUrl}"
               style="display:inline-block;padding:14px 32px;background:#0369a1;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px;">
              Сбросить пароль
            </a>
            <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
              Ссылка действительна <strong>1 час</strong>. Если вы не запрашивали сброс пароля — проигнорируйте это письмо.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#cbd5e1;">
              Fishopt &mdash; B2B портал оптовой торговли рыбой &mdash;
              <a href="${frontendUrl}" style="color:#0369a1;text-decoration:none;">fishopt.pro</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const response = await fetch('https://go1.unisender.ru/ru/transactional/api/v1/email/send.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        message: {
          recipients: [{ email: to }],
          from_email: from,
          from_name: 'Fishopt',
          subject: 'Сброс пароля — Fishopt',
          body: { html },
          track_links: 0,
          track_read: 0,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`UniSender Go error ${response.status}: ${text}`);
    }

    this.logger.log(`Password reset email sent to ${to}`);
  }
}
