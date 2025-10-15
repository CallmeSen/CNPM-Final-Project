import {
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';

@Controller('api/payment/webhook')
export class WebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    return this.stripeService.handleWebhook(req, res);
  }
}
