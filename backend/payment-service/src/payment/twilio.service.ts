import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private readonly client: Twilio;
  private readonly twilioPhoneNumber: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.twilioPhoneNumber = this.configService.get<string>(
      'TWILIO_PHONE_NUMBER',
    )!;
    this.client = new Twilio(accountSid, authToken);
  }

  async sendPaymentSMS(phoneNumber: string, message: string): Promise<void> {
    if (!phoneNumber || !phoneNumber.trim()) {
      this.logger.warn('Skipping SMS send: missing phone number.');
      return;
    }

    try {
      const response = await this.client.messages.create({
        body: message,
        from: this.twilioPhoneNumber,
        to: phoneNumber,
      });
      this.logger.log(`SMS sent to ${phoneNumber}: ${response.sid}`);
    } catch (error) {
      this.logger.error('❌ Error sending SMS:', error.message);
      throw error;
    }
  }
}
