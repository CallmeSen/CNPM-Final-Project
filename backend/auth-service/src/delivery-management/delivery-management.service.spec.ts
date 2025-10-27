import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPersonnel } from '../schemas/delivery-personnel.schema';
import { DeliveryManagementService } from './delivery-management.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

type MockModel = {
  find: jest.Mock;
  findOne: jest.Mock;
  findById: jest.Mock;
  findByIdAndDelete: jest.Mock;
  create: jest.Mock;
  countDocuments: jest.Mock;
  aggregate: jest.Mock;
};

const createMockModel = (): MockModel => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
});

const createDocument = (payload: Record<string, unknown>) => {
  const doc: any = {
    ...payload,
    save: jest.fn().mockResolvedValue(true),
    toObject: jest.fn().mockImplementation(() => {
      const { save: _save, toObject: _toObject, ...rest } = doc;
      return { ...rest };
    }),
  };
  return doc;
};

describe('DeliveryManagementService', () => {
  let service: DeliveryManagementService;
  let deliveryModel: MockModel;

  beforeEach(async () => {
    deliveryModel = createMockModel();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryManagementService,
        {
          provide: getModelToken(DeliveryPersonnel.name),
          useValue: deliveryModel,
        },
      ],
    }).compile();

    service = module.get(DeliveryManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllDelivery', () => {
    it('returns delivery personnel with applied filters', async () => {
      const doc = createDocument({ id: '1', firstName: 'Driver' });
      deliveryModel.find.mockReturnValue({
        select: jest.fn().mockResolvedValue([doc]),
      });

      const result = await service.getAllDelivery({
        status: 'available',
        vehicleType: 'bike',
      });

      expect(deliveryModel.find).toHaveBeenCalledWith({
        isAvailable: true,
        vehicleType: 'bike',
      });
      expect(result).toEqual([doc]);
    });
  });

  describe('getDeliveryById', () => {
    it('returns delivery personnel when found', async () => {
      const doc = createDocument({ id: '2' });
      deliveryModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(doc),
      });

      const result = await service.getDeliveryById('2');
      expect(deliveryModel.findById).toHaveBeenCalledWith('2');
      expect(result).toEqual(doc);
    });

    it('throws when delivery personnel is missing', async () => {
      deliveryModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getDeliveryById('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('createDelivery', () => {
    const payload: CreateDeliveryDto = {
      firstName: 'New',
      lastName: 'Driver',
      email: 'driver@example.com',
      phone: '123',
      password: 'secret123',
      vehicleType: 'bike',
      licenseNumber: 'ABC123',
    };

    it('creates delivery personnel and strips password', async () => {
      const doc = createDocument({
        ...payload,
        currentLocation: {
          type: 'Point',
          coordinates: [0, 0],
        },
      });
      deliveryModel.findOne.mockResolvedValue(null);
      deliveryModel.create.mockResolvedValue(doc);

      const result = await service.createDelivery(payload);

      expect(deliveryModel.findOne).toHaveBeenCalledWith({
        email: 'driver@example.com',
      });
      expect(deliveryModel.create).toHaveBeenCalledWith({
        ...payload,
        currentLocation: {
          type: 'Point',
          coordinates: [0, 0],
        },
      });
      expect(result).toEqual({
        message: 'Delivery personnel created successfully',
        delivery: {
          firstName: 'New',
          lastName: 'Driver',
          email: 'driver@example.com',
          phone: '123',
          vehicleType: 'bike',
          licenseNumber: 'ABC123',
          currentLocation: {
            type: 'Point',
            coordinates: [0, 0],
          },
        },
      });
    });

    it('throws when email already exists', async () => {
      deliveryModel.findOne.mockResolvedValue(createDocument({ ...payload }));

      await expect(service.createDelivery(payload)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(deliveryModel.create).not.toHaveBeenCalled();
    });
  });

  describe('updateDelivery', () => {
    it('updates provided fields and preserves password when empty string', async () => {
      const doc = createDocument({
        id: '1',
        firstName: 'Old',
        password: 'hashed',
        isAvailable: true,
      });
      deliveryModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(doc),
      });

      const result = await service.updateDelivery('1', {
        firstName: 'Updated',
        password: '',
      });

      expect(doc.firstName).toBe('Updated');
      expect(doc.password).toBe('hashed');
      expect(doc.save).toHaveBeenCalled();
      expect(result.delivery).toMatchObject({ firstName: 'Updated' });
    });

    it('throws when delivery personnel is missing', async () => {
      deliveryModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.updateDelivery('missing', {}),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('deleteDelivery', () => {
    it('removes delivery personnel', async () => {
      const doc = createDocument({ id: '3' });
      deliveryModel.findByIdAndDelete.mockResolvedValue(doc);

      const result = await service.deleteDelivery('3');
      expect(deliveryModel.findByIdAndDelete).toHaveBeenCalledWith('3');
      expect(result).toEqual({
        message: 'Delivery personnel deleted successfully',
      });
    });

    it('throws when nothing is deleted', async () => {
      deliveryModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.deleteDelivery('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('updateLocation', () => {
    it('updates location coordinates', async () => {
      const doc = createDocument({
        id: '4',
        currentLocation: { type: 'Point', coordinates: [0, 0] },
      });
      deliveryModel.findById.mockResolvedValue(doc);

      const result = await service.updateLocation('4', {
        latitude: 10,
        longitude: 20,
      });

      expect(doc.currentLocation.coordinates).toEqual([20, 10]);
      expect(doc.save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Location updated successfully',
        location: doc.currentLocation,
      });
    });

    it('throws when delivery personnel is missing', async () => {
      deliveryModel.findById.mockResolvedValue(null);

      await expect(
        service.updateLocation('missing', { latitude: 0, longitude: 0 }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('toggleAvailability', () => {
    it('flips availability flag', async () => {
      const doc = createDocument({ id: '5', isAvailable: true });
      deliveryModel.findById.mockResolvedValue(doc);

      const result = await service.toggleAvailability('5');

      expect(doc.isAvailable).toBe(false);
      expect(doc.save).toHaveBeenCalled();
      expect(result.message).toBe('Availability updated successfully');
    });
  });

  describe('getDeliveryStats', () => {
    it('aggregates metrics from the collection', async () => {
      deliveryModel.countDocuments
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(6);
      deliveryModel.aggregate
        .mockResolvedValueOnce([{ _id: 'bike', count: 4 }])
        .mockResolvedValueOnce([{ avgRating: 4.5 }]);

      const topPerformers = [{ id: 'top' }];
      const selectMock = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(topPerformers),
        }),
      });
      deliveryModel.find.mockReturnValue({ select: selectMock });

      const result = await service.getDeliveryStats();

      expect(deliveryModel.countDocuments).toHaveBeenCalledTimes(2);
      expect(deliveryModel.countDocuments.mock.calls[0]).toEqual([]);
      expect(deliveryModel.countDocuments.mock.calls[1]).toEqual([
        { isAvailable: true },
      ]);
      expect(deliveryModel.aggregate).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        totalDelivery: 10,
        availableDelivery: 6,
        busyDelivery: 4,
        vehicleStats: [{ _id: 'bike', count: 4 }],
        averageRating: 4.5,
        topPerformers,
      });
    });
  });

  describe('findNearbyDelivery', () => {
    it('returns available riders ordered by proximity', async () => {
      const nearby = [{ id: 'nearby' }];
      const limitMock = jest.fn().mockResolvedValue(nearby);
      const selectMock = jest.fn().mockReturnValue({ limit: limitMock });
      deliveryModel.find.mockReturnValue({ select: selectMock });

      const result = await service.findNearbyDelivery({
        longitude: '20',
        latitude: '10',
        maxDistance: '1000',
      });

      expect(deliveryModel.find).toHaveBeenCalledWith({
        isAvailable: true,
        currentLocation: expect.any(Object),
      });
      expect(selectMock).toHaveBeenCalledWith('-password');
      expect(limitMock).toHaveBeenCalledWith(10);
      expect(result).toEqual(nearby);
    });

    it('throws when coordinates are invalid', async () => {
      await expect(
        service.findNearbyDelivery({
          longitude: 'abc',
          latitude: 'xyz',
          maxDistance: '1000',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
