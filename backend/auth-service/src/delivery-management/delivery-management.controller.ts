import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DeliveryManagementService } from './delivery-management.service';
import { DeliveryQueryDto } from './dto/delivery-query.dto';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { NearbyQueryDto } from './dto/nearby-query.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'superAdmin', 'super-admin')
@Controller('management')
export class DeliveryManagementController {
  constructor(private readonly deliveryService: DeliveryManagementService) {}

  @Get('delivery')
  async getAll(@Query() query: DeliveryQueryDto) {
    return this.deliveryService.getAllDelivery(query);
  }

  @Get('delivery/stats')
  async getStats() {
    return this.deliveryService.getDeliveryStats();
  }

  @Get('delivery/nearby')
  async getNearby(@Query() query: NearbyQueryDto) {
    return this.deliveryService.findNearbyDelivery(query);
  }

  @Get('delivery/:id')
  async getById(@Param('id') id: string) {
    return this.deliveryService.getDeliveryById(id);
  }

  @Post('delivery')
  async create(@Body() dto: CreateDeliveryDto) {
    return this.deliveryService.createDelivery(dto);
  }

  @Put('delivery/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateDeliveryDto) {
    return this.deliveryService.updateDelivery(id, dto);
  }

  @Delete('delivery/:id')
  async remove(@Param('id') id: string) {
    return this.deliveryService.deleteDelivery(id);
  }

  @Patch('delivery/:id/location')
  async updateLocation(
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.deliveryService.updateLocation(id, dto);
  }

  @Patch('delivery/:id/availability')
  async toggleAvailability(@Param('id') id: string) {
    return this.deliveryService.toggleAvailability(id);
  }
}
