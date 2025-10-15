import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  DeliveryPersonnel,
  DeliveryPersonnelDocument,
} from '../schemas/delivery-personnel.schema';
import { DeliveryQueryDto } from './dto/delivery-query.dto';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { NearbyQueryDto } from './dto/nearby-query.dto';

@Injectable()
export class DeliveryManagementService {
  constructor(
    @InjectModel(DeliveryPersonnel.name)
    private readonly deliveryModel: Model<DeliveryPersonnelDocument>,
  ) {}

  async getAllDelivery(query: DeliveryQueryDto) {
    const filter: FilterQuery<DeliveryPersonnelDocument> = {};
    if (query.status === 'available') {
      filter.isAvailable = true;
    }
    if (query.status === 'busy') {
      filter.isAvailable = false;
    }
    if (query.vehicleType) {
      filter.vehicleType = query.vehicleType;
    }

    const delivery = await this.deliveryModel.find(filter).select('-password');
    return delivery;
  }

  async getDeliveryById(id: string) {
    const delivery = await this.deliveryModel.findById(id).select('-password');
    if (!delivery) {
      throw new NotFoundException('Delivery personnel not found');
    }
    return delivery;
  }

  async createDelivery(dto: CreateDeliveryDto) {
    const existing = await this.deliveryModel.findOne({ email: dto.email });
    if (existing) {
      throw new BadRequestException(
        'Delivery personnel with this email already exists',
      );
    }

    const delivery = await this.deliveryModel.create({
      ...dto,
      currentLocation: {
        type: 'Point',
        coordinates: [0, 0],
      },
    });

    const result = delivery.toObject();
    delete result.password;
    return {
      message: 'Delivery personnel created successfully',
      delivery: result,
    };
  }

  async updateDelivery(id: string, dto: UpdateDeliveryDto) {
    const delivery = await this.deliveryModel.findById(id).select('+password');
    if (!delivery) {
      throw new NotFoundException('Delivery personnel not found');
    }

    if (dto.password === '') {
      delete dto.password;
    }

    Object.entries(dto).forEach(([key, value]) => {
      if (typeof value !== 'undefined') {
        (delivery as any)[key] = value;
      }
    });

    await delivery.save();

    const result = delivery.toObject();
    delete result.password;

    return {
      message: 'Delivery personnel updated successfully',
      delivery: result,
    };
  }

  async deleteDelivery(id: string) {
    const delivery = await this.deliveryModel.findByIdAndDelete(id);
    if (!delivery) {
      throw new NotFoundException('Delivery personnel not found');
    }
    return { message: 'Delivery personnel deleted successfully' };
  }

  async updateLocation(id: string, dto: UpdateLocationDto) {
    const delivery = await this.deliveryModel.findById(id);
    if (!delivery) {
      throw new NotFoundException('Delivery personnel not found');
    }

    delivery.currentLocation = {
      type: 'Point',
      coordinates: [dto.longitude, dto.latitude],
    } as any;

    await delivery.save();

    return {
      message: 'Location updated successfully',
      location: delivery.currentLocation,
    };
  }

  async toggleAvailability(id: string) {
    const delivery = await this.deliveryModel.findById(id);
    if (!delivery) {
      throw new NotFoundException('Delivery personnel not found');
    }

    delivery.isAvailable = !delivery.isAvailable;
    await delivery.save();

    const result = delivery.toObject();
    delete result.password;

    return {
      message: 'Availability updated successfully',
      delivery: result,
    };
  }

  async getDeliveryStats() {
    const totalDelivery = await this.deliveryModel.countDocuments();
    const availableDelivery = await this.deliveryModel.countDocuments({
      isAvailable: true,
    });
    const busyDelivery = totalDelivery - availableDelivery;

    const vehicleStats = await this.deliveryModel.aggregate([
      {
        $group: {
          _id: '$vehicleType',
          count: { $sum: 1 },
        },
      },
    ]);

    const avgRating = await this.deliveryModel.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const topPerformers = await this.deliveryModel
      .find()
      .select('-password')
      .sort({ rating: -1, totalDeliveries: -1 })
      .limit(5);

    return {
      totalDelivery,
      availableDelivery,
      busyDelivery,
      vehicleStats,
      averageRating: avgRating.length > 0 ? avgRating[0].avgRating : 0,
      topPerformers,
    };
  }

  async findNearbyDelivery(query: NearbyQueryDto) {
    const { longitude, latitude, maxDistance = '5000' } = query;

    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);
    const max = parseInt(maxDistance, 10);

    if (Number.isNaN(lon) || Number.isNaN(lat)) {
      throw new BadRequestException('Longitude and latitude are required');
    }

    const nearby = await this.deliveryModel
      .find({
        isAvailable: true,
        currentLocation: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lon, lat],
            },
            $maxDistance: max,
          },
        },
      })
      .select('-password')
      .limit(10);

    return nearby;
  }
}
