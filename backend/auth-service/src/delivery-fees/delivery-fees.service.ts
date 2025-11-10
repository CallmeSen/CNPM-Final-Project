import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DeliveryFee,
  DeliveryFeeDocument,
} from '../schemas/delivery-fee.schema';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { CalculateFeeDto } from './dto/calculate-fee.dto';

@Injectable()
export class DeliveryFeesService {
  constructor(
    @InjectModel(DeliveryFee.name)
    private readonly deliveryFeeModel: Model<DeliveryFeeDocument>,
  ) {}

  getAllFees() {
    return this.deliveryFeeModel.find();
  }

  getActiveFees() {
    return this.deliveryFeeModel.find({ isActive: true });
  }

  async createFee(dto: CreateFeeDto) {
    const fee = await this.deliveryFeeModel.create(dto);
    return {
      message: 'Delivery fee created successfully',
      fee,
    };
  }

  async updateFee(id: string, dto: UpdateFeeDto) {
    const fee = await this.deliveryFeeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!fee) {
      throw new NotFoundException('Delivery fee not found');
    }

    return {
      message: 'Delivery fee updated successfully',
      fee,
    };
  }

  async deleteFee(id: string) {
    const fee = await this.deliveryFeeModel.findByIdAndDelete(id);
    if (!fee) {
      throw new NotFoundException('Delivery fee not found');
    }
    return { message: 'Delivery fee deleted successfully' };
  }

  async calculateFee(query: CalculateFeeDto) {
    const distance = parseFloat(query.distance);
    if (Number.isNaN(distance)) {
      throw new BadRequestException('Distance is required');
    }

    const vehicleType = query.vehicleType ?? 'all';
    let feeConfig = await this.deliveryFeeModel.findOne({
      isActive: true,
      vehicleType,
    });

    if (!feeConfig && vehicleType !== 'all') {
      feeConfig = await this.deliveryFeeModel.findOne({
        isActive: true,
        vehicleType: 'all',
      });
    }

    if (!feeConfig) {
      throw new NotFoundException('No active delivery fee configuration found');
    }

    const isRushHour = query.isRushHour === 'true';
    const calculatedFee = feeConfig.calculateFee(distance, isRushHour);

    return {
      distance,
      baseFee: feeConfig.baseFee,
      baseDistance: feeConfig.baseDistance,
      perKmFee: feeConfig.perKmFee,
      isRushHour,
      rushHourMultiplier: feeConfig.rushHourMultiplier,
      calculatedFee,
      vehicleType: feeConfig.vehicleType,
    };
  }
}
