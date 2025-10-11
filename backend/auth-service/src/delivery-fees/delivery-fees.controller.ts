import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DeliveryFeesService } from './delivery-fees.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { CalculateFeeDto } from './dto/calculate-fee.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'superAdmin', 'super-admin')
@Controller('management')
export class DeliveryFeesController {
  constructor(private readonly deliveryFeesService: DeliveryFeesService) {}

  @Get('delivery-fees')
  getAllFees() {
    return this.deliveryFeesService.getAllFees();
  }

  @Get('delivery-fees/active')
  getActiveFees() {
    return this.deliveryFeesService.getActiveFees();
  }

  @Get('delivery-fees/calculate')
  calculateFee(@Query() query: CalculateFeeDto) {
    return this.deliveryFeesService.calculateFee(query);
  }

  @Post('delivery-fees')
  createFee(@Body() dto: CreateFeeDto) {
    return this.deliveryFeesService.createFee(dto);
  }

  @Put('delivery-fees/:id')
  updateFee(@Param('id') id: string, @Body() dto: UpdateFeeDto) {
    return this.deliveryFeesService.updateFee(id, dto);
  }

  @Delete('delivery-fees/:id')
  deleteFee(@Param('id') id: string) {
    return this.deliveryFeesService.deleteFee(id);
  }
}
