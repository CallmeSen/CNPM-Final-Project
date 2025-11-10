import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

// Mock Resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn(),
      },
    })),
  };
});

describe('EmailService', () => {
  let service: EmailService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        RESEND_API_KEY: 're_mock_api_key',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendPaymentReceipt', () => {
    it('should send email successfully', async () => {
      const mockResponse = {
        id: 'email_123',
        from: 'SkyDish <onboarding@resend.dev>',
        to: 'customer@example.com',
        created_at: new Date().toISOString(),
      };

      (service as any).resend.emails.send.mockResolvedValue(mockResponse);

      const result = await service.sendPaymentReceipt(
        'customer@example.com',
        'Payment Confirmation',
        '<p>Your payment was successful!</p>',
      );

      expect((service as any).resend.emails.send).toHaveBeenCalledWith({
        from: 'SkyDish <onboarding@resend.dev>',
        to: 'customer@example.com',
        subject: 'Payment Confirmation',
        html: '<p>Your payment was successful!</p>',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when email sending fails', async () => {
      const mockError = new Error('Resend API error');
      (service as any).resend.emails.send.mockRejectedValue(mockError);

      await expect(
        service.sendPaymentReceipt(
          'customer@example.com',
          'Payment Confirmation',
          '<p>Your payment was successful!</p>',
        ),
      ).rejects.toThrow('Resend API error');
    });

    it('should send email with HTML content', async () => {
      const htmlContent = `
        <div>
          <h1>Payment Receipt</h1>
          <p>Order ID: ORDER123</p>
          <p>Amount: $100.00</p>
        </div>
      `;

      const mockResponse = { id: 'email_123' };
      (service as any).resend.emails.send.mockResolvedValue(mockResponse);

      await service.sendPaymentReceipt(
        'customer@example.com',
        'Payment Receipt',
        htmlContent,
      );

      expect((service as any).resend.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          html: htmlContent,
        }),
      );
    });
  });
});

