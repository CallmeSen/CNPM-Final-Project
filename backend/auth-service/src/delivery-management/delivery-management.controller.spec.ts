import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { DeliveryManagementController } from './delivery-management.controller';
import { DeliveryManagementService } from './delivery-management.service';

const moduleMocker = new ModuleMocker(global);

type DeliveryManagementServiceMock = {
  getAllDelivery: jest.Mock;
  getDeliveryStats: jest.Mock;
  findNearbyDelivery: jest.Mock;
  getDeliveryById: jest.Mock;
  createDelivery: jest.Mock;
  updateDelivery: jest.Mock;
  deleteDelivery: jest.Mock;
  updateLocation: jest.Mock;
  toggleAvailability: jest.Mock;
};

describe('DeliveryManagementController', () => {
  let controller: DeliveryManagementController;
  let service: DeliveryManagementServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryManagementController],
    })
      .useMocker((token) => {
        if (token === DeliveryManagementService) {
          return {
            getAllDelivery: jest.fn(),
            getDeliveryStats: jest.fn(),
            findNearbyDelivery: jest.fn(),
            getDeliveryById: jest.fn(),
            createDelivery: jest.fn(),
            updateDelivery: jest.fn(),
            deleteDelivery: jest.fn(),
            updateLocation: jest.fn(),
            toggleAvailability: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const metadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(metadata);
          return new (Mock as any)();
        }
      })
      .compile();

    controller = module.get(DeliveryManagementController);
    service = module.get(DeliveryManagementService) as DeliveryManagementServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('retrieves delivery list', async () => {
    const query = { status: 'available' };
    const data = [{ id: '1' }];
    service.getAllDelivery.mockResolvedValue(data);

    const result = await controller.getAll(query as any);

    expect(service.getAllDelivery).toHaveBeenCalledWith(query);
    expect(result).toEqual(data);
  });

  it('returns stats from the service', async () => {
    const stats = { totalDelivery: 1 };
    service.getDeliveryStats.mockResolvedValue(stats);

    const result = await controller.getStats();

    expect(service.getDeliveryStats).toHaveBeenCalled();
    expect(result).toEqual(stats);
  });

  it('fetches nearby delivery personnel', async () => {
    const query = { longitude: '1', latitude: '2' };
    const nearby = [{ id: 'nearby' }];
    service.findNearbyDelivery.mockResolvedValue(nearby);

    const result = await controller.getNearby(query as any);

    expect(service.findNearbyDelivery).toHaveBeenCalledWith(query);
    expect(result).toEqual(nearby);
  });

  it('retrieves delivery by id', async () => {
    const delivery = { id: '1' };
    service.getDeliveryById.mockResolvedValue(delivery);

    const result = await controller.getById('1');

    expect(service.getDeliveryById).toHaveBeenCalledWith('1');
    expect(result).toEqual(delivery);
  });

  it('creates delivery personnel', async () => {
    const dto = { firstName: 'A' };
    const created = { message: 'created' };
    service.createDelivery.mockResolvedValue(created);

    const result = await controller.create(dto as any);

    expect(service.createDelivery).toHaveBeenCalledWith(dto);
    expect(result).toEqual(created);
  });

  it('updates delivery personnel', async () => {
    const dto = { firstName: 'B' };
    const updated = { message: 'updated' };
    service.updateDelivery.mockResolvedValue(updated);

    const result = await controller.update('1', dto as any);

    expect(service.updateDelivery).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updated);
  });

  it('removes delivery personnel', async () => {
    const deleted = { message: 'deleted' };
    service.deleteDelivery.mockResolvedValue(deleted);

    const result = await controller.remove('1');

    expect(service.deleteDelivery).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleted);
  });

  it('updates location', async () => {
    const dto = { latitude: 1, longitude: 2 };
    const payload = { message: 'updated' };
    service.updateLocation.mockResolvedValue(payload);

    const result = await controller.updateLocation('1', dto as any);

    expect(service.updateLocation).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(payload);
  });

  it('toggles availability', async () => {
    const payload = { message: 'toggled' };
    service.toggleAvailability.mockResolvedValue(payload);

    const result = await controller.toggleAvailability('1');

    expect(service.toggleAvailability).toHaveBeenCalledWith('1');
    expect(result).toEqual(payload);
  });
});

