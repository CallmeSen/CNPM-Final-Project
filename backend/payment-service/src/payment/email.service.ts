import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendPaymentReceipt(
    to: string,
    subject: string,
    html: string,
  ): Promise<any> {
    try {
      const data = await this.resend.emails.send({
        from: 'SkyDish <onboarding@resend.dev>',
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent to ${to}`);
      return data;
    } catch (error) {
      this.logger.error('❌ Error sending email:', error.message);
      throw error;
    }
  }
}
