import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { StripeService } from './stripe.service';
import { Request, Response } from 'express';

describe('WebhookController', () => {
  let controller: WebhookController;
  let stripeService: StripeService;

  const mockStripeService = {
    handleWebhook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: StripeService,
          useValue: mockStripeService,
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    stripeService = module.get<StripeService>(StripeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleWebhook', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockRequest = {
        body: {},
        headers: {
          'stripe-signature': 'mock_signature',
        },
      };

      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
    });

    it('should call stripeService.handleWebhook', async () => {
      mockStripeService.handleWebhook.mockResolvedValue(
        mockResponse as Response,
      );

      await controller.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStripeService.handleWebhook).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
      );
    });

    it('should return response from stripeService', async () => {
      const expectedResponse = mockResponse;
      mockStripeService.handleWebhook.mockResolvedValue(expectedResponse);

      const result = await controller.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBe(expectedResponse);
    });

    it('should handle webhook with valid signature', async () => {
      mockResponse.json = jest.fn().mockReturnValue({ received: true });
      mockStripeService.handleWebhook.mockImplementation(
        async (_req, res: Response) => {
          return res.json({ received: true });
        },
      );

      await controller.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStripeService.handleWebhook).toHaveBeenCalled();
    });

    it('should handle webhook errors', async () => {
      mockStripeService.handleWebhook.mockImplementation(
        async (_req, res: Response) => {
          return res.status(400).send('Webhook Error: Invalid signature');
        },
      );

      await controller.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStripeService.handleWebhook).toHaveBeenCalled();
    });
  });
});

