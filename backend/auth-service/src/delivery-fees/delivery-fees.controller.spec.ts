import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesService } from './delivery-fees.service';
import { CalculateFeeDto } from './dto/calculate-fee.dto';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';

const moduleMocker = new ModuleMocker(global);

type DeliveryFeesServiceMock = {
  getAllFees: jest.Mock;
  getActiveFees: jest.Mock;
  calculateFee: jest.Mock;
  createFee: jest.Mock;
  updateFee: jest.Mock;
  deleteFee: jest.Mock;
};

describe('DeliveryFeesController', () => {
  let controller: DeliveryFeesController;
  let service: DeliveryFeesServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryFeesController],
    })
      .useMocker((token) => {
        if (token === DeliveryFeesService) {
          return {
            getAllFees: jest.fn(),
            getActiveFees: jest.fn(),
            calculateFee: jest.fn(),
            createFee: jest.fn(),
            updateFee: jest.fn(),
            deleteFee: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const metadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(metadata);
          return new (Mock as any)();
        }
      })
      .compile();

    controller = module.get(DeliveryFeesController);
    service = module.get(DeliveryFeesService) as DeliveryFeesServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('gets all fees', () => {
    const fees = [{ id: '1' }];
    service.getAllFees.mockReturnValue(fees);

    const result = controller.getAllFees();

    expect(service.getAllFees).toHaveBeenCalledTimes(1);
    expect(service.getAllFees.mock.calls[0]).toEqual([]);
    expect(result).toBe(fees);
  });

  it('gets active fees', () => {
    const fees = [{ id: 'active' }];
    service.getActiveFees.mockReturnValue(fees);

    const result = controller.getActiveFees();

    expect(service.getActiveFees).toHaveBeenCalledTimes(1);
    expect(service.getActiveFees.mock.calls[0]).toEqual([]);
    expect(result).toBe(fees);
  });

  it('calculates fee', async () => {
    const query: CalculateFeeDto = { distance: '3' };
    const payload = { calculatedFee: 20000 };
    service.calculateFee.mockResolvedValue(payload);

    await expect(controller.calculateFee(query)).resolves.toEqual(payload);
    expect(service.calculateFee).toHaveBeenCalledWith(query);
  });

  it('creates a fee', async () => {
    const dto: CreateFeeDto = {
      name: 'Standard',
      baseDistance: 3,
      baseFee: 10000,
      perKmFee: 5000,
      vehicleType: 'bike',
      rushHourMultiplier: 1.5,
      isActive: true,
    };
    const payload = { message: 'created' };
    service.createFee.mockResolvedValue(payload);

    const result = await controller.createFee(dto);

    expect(service.createFee).toHaveBeenCalledWith(dto);
    expect(result).toEqual(payload);
  });

  it('updates a fee', async () => {
    const dto: UpdateFeeDto = { name: 'Updated' };
    const payload = { message: 'updated' };
    service.updateFee.mockResolvedValue(payload);

    const result = await controller.updateFee('1', dto);

    expect(service.updateFee).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(payload);
  });

  it('deletes a fee', async () => {
    const payload = { message: 'deleted' };
    service.deleteFee.mockResolvedValue(payload);

    const result = await controller.deleteFee('1');

    expect(service.deleteFee).toHaveBeenCalledWith('1');
    expect(result).toEqual(payload);
  });
});
