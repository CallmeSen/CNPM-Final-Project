import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryFee } from '../schemas/delivery-fee.schema';
import { DeliveryFeesService } from './delivery-fees.service';

type MockModel = {
  find: jest.Mock;
  findOne: jest.Mock;
  create: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
};

const createMockModel = (): MockModel => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
});

const createFeeDoc = (overrides: Record<string, unknown> = {}) => ({
  baseFee: 15000,
  baseDistance: 3,
  perKmFee: 5000,
  rushHourMultiplier: 1.5,
  vehicleType: 'bike',
  calculateFee: jest.fn().mockReturnValue(20000),
  ...overrides,
});

describe('DeliveryFeesService', () => {
  let service: DeliveryFeesService;
  let feeModel: MockModel;

  beforeEach(async () => {
    feeModel = createMockModel();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryFeesService,
        {
          provide: getModelToken(DeliveryFee.name),
          useValue: feeModel,
        },
      ],
    }).compile();

    service = module.get(DeliveryFeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns all fees', () => {
    const query = [{ id: '1' }];
    feeModel.find.mockReturnValue(query);

    const result = service.getAllFees();

    expect(feeModel.find).toHaveBeenCalledTimes(1);
    expect(feeModel.find.mock.calls[0]).toEqual([]);
    expect(result).toBe(query);
  });

  it('returns active fees', () => {
    const active = [{ id: '1' }];
    feeModel.find.mockReturnValue(active);

    const result = service.getActiveFees();

    expect(feeModel.find).toHaveBeenCalledWith({ isActive: true });
    expect(result).toBe(active);
  });

  it('creates a fee entry', async () => {
    const dto = {
      name: 'Standard',
      baseDistance: 3,
      baseFee: 10000,
      perKmFee: 5000,
      vehicleType: 'bike',
      rushHourMultiplier: 1.5,
      isActive: true,
    };
    const doc = createFeeDoc(dto);
    feeModel.create.mockResolvedValue(doc);

    const result = await service.createFee(dto);

    expect(feeModel.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      message: 'Delivery fee created successfully',
      fee: doc,
    });
  });

  describe('updateFee', () => {
    it('updates fee when record exists', async () => {
      const doc = createFeeDoc({ id: '1' });
      feeModel.findByIdAndUpdate.mockResolvedValue(doc);

      const result = await service.updateFee('1', { name: 'Updated' });

      expect(feeModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'Updated' },
        { new: true },
      );
      expect(result).toEqual({
        message: 'Delivery fee updated successfully',
        fee: doc,
      });
    });

    it('throws when fee is missing', async () => {
      feeModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        service.updateFee('missing', { name: 'Updated' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('deleteFee', () => {
    it('removes fee entry', async () => {
      const doc = createFeeDoc({ id: '1' });
      feeModel.findByIdAndDelete.mockResolvedValue(doc);

      const result = await service.deleteFee('1');

      expect(feeModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        message: 'Delivery fee deleted successfully',
      });
    });

    it('throws when fee cannot be located', async () => {
      feeModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.deleteFee('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('calculateFee', () => {
    it('computes fee using matching vehicle configuration', async () => {
      const doc = createFeeDoc({ calculateFee: jest.fn().mockReturnValue(25000) });
      feeModel.findOne.mockResolvedValue(doc);

      const result = await service.calculateFee({
        distance: '5',
        vehicleType: 'bike',
      });

      expect(feeModel.findOne).toHaveBeenCalledWith({
        isActive: true,
        vehicleType: 'bike',
      });
      expect(doc.calculateFee).toHaveBeenCalledWith(5, false);
      expect(result).toMatchObject({
        distance: 5,
        calculatedFee: 25000,
        vehicleType: 'bike',
      });
    });

    it('falls back to all-vehicle configuration when specific type is missing', async () => {
      const fallback = createFeeDoc({
        vehicleType: 'all',
        calculateFee: jest.fn().mockReturnValue(30000),
      });
      feeModel.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(fallback);

      const result = await service.calculateFee({
        distance: '2',
        vehicleType: 'car',
        isRushHour: 'true',
      });

      expect(feeModel.findOne).toHaveBeenNthCalledWith(1, {
        isActive: true,
        vehicleType: 'car',
      });
      expect(feeModel.findOne).toHaveBeenNthCalledWith(2, {
        isActive: true,
        vehicleType: 'all',
      });
      expect(fallback.calculateFee).toHaveBeenCalledWith(2, true);
      expect(result.isRushHour).toBe(true);
      expect(result.vehicleType).toBe('all');
    });

    it('throws when no configuration exists', async () => {
      feeModel.findOne.mockResolvedValue(null);

      await expect(
        service.calculateFee({ distance: '1' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when distance is invalid', async () => {
      await expect(
        service.calculateFee({ distance: 'NaN' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
