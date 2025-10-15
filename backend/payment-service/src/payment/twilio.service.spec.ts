import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from './twilio.service';

// Mock Twilio
jest.mock('twilio', () => {
  return {
    Twilio: jest.fn().mockImplementation(() => ({
      messages: {
        create: jest.fn(),
      },
    })),
  };
});

describe('TwilioService', () => {
  let service: TwilioService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        TWILIO_ACCOUNT_SID: 'ACtest123',
        TWILIO_AUTH_TOKEN: 'test_auth_token',
        TWILIO_PHONE_NUMBER: '+15555555555',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwilioService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<TwilioService>(TwilioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendPaymentSMS', () => {
    it('should send SMS successfully', async () => {
      const mockResponse = {
        sid: 'SM123456789',
        body: 'Your payment was successful!',
        to: '+1234567890',
        from: '+15555555555',
        status: 'sent',
      };

      (service as any).client.messages.create.mockResolvedValue(mockResponse);

      await service.sendPaymentSMS(
        '+1234567890',
        'Your payment was successful!',
      );

      expect((service as any).client.messages.create).toHaveBeenCalledWith({
        body: 'Your payment was successful!',
        from: '+15555555555',
        to: '+1234567890',
      });
    });

    it('should skip SMS if phone number is empty', async () => {
      await service.sendPaymentSMS('', 'Test message');

      expect((service as any).client.messages.create).not.toHaveBeenCalled();
    });

    it('should skip SMS if phone number is whitespace', async () => {
      await service.sendPaymentSMS('   ', 'Test message');

      expect((service as any).client.messages.create).not.toHaveBeenCalled();
    });

    it('should skip SMS if phone number is null', async () => {
      await service.sendPaymentSMS(null as any, 'Test message');

      expect((service as any).client.messages.create).not.toHaveBeenCalled();
    });

    it('should throw error when SMS sending fails', async () => {
      const mockError = new Error('Twilio API error');
      (service as any).client.messages.create.mockRejectedValue(mockError);

      await expect(
        service.sendPaymentSMS('+1234567890', 'Test message'),
      ).rejects.toThrow('Twilio API error');
    });

    it('should send SMS with payment success message', async () => {
      const mockResponse = { sid: 'SM123' };
      (service as any).client.messages.create.mockResolvedValue(mockResponse);

      const message = 'Your payment for Order ORDER123 was successful!';
      await service.sendPaymentSMS('+1234567890', message);

      expect((service as any).client.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          body: message,
        }),
      );
    });

    it('should send SMS with payment failure message', async () => {
      const mockResponse = { sid: 'SM123' };
      (service as any).client.messages.create.mockResolvedValue(mockResponse);

      const message = 'Your payment for Order ORDER123 failed. Please try again.';
      await service.sendPaymentSMS('+1234567890', message);

      expect((service as any).client.messages.create).toHaveBeenCalledWith(
        expect.objectContaining({
          body: message,
        }),
      );
    });
  });
});

