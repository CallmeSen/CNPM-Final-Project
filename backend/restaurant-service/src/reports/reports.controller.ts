import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { GetUser } from '../common/decorators/get-user.decorator';

interface AuthenticatedUser {
  restaurantId?: string;
  [key: string]: unknown;
}

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.RESTAURANT)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  private ensureRestaurant(user?: AuthenticatedUser) {
    if (!user?.restaurantId) {
      throw new UnauthorizedException('Restaurant context missing from token');
    }

    return user.restaurantId;
  }

  @Get('revenue')
  getRevenue(
    @GetUser() user: AuthenticatedUser,
    @Headers('authorization') authHeader: string,
    @Query('period') period?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.reportsService.getRevenueData(
      restaurantId,
      {
        period: period as 'day' | 'week' | 'month' | undefined,
        startDate,
        endDate,
      },
      authHeader,
    );
  }

  @Get('top-items')
  getTopSellingItems(
    @GetUser() user: AuthenticatedUser,
    @Headers('authorization') authHeader: string,
    @Query('period') period?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: string,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.reportsService.getTopSellingItems(
      restaurantId,
      {
        period: period as 'day' | 'week' | 'month' | undefined,
        startDate,
        endDate,
        limit: limit ? Number(limit) : undefined,
      },
      authHeader,
    );
  }

  @Get('reviews')
  getReviews(
    @GetUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.reportsService.getCustomerReviews(
      restaurantId,
      limit ? Number(limit) : 10,
    );
  }

  @Get('summary')
  getSummary(
    @GetUser() user: AuthenticatedUser,
    @Headers('authorization') authHeader: string,
    @Query('period') period?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.reportsService.getSummary(
      restaurantId,
      {
        period: period as 'day' | 'week' | 'month' | undefined,
        startDate,
        endDate,
      },
      authHeader,
    );
  }

  @Get('debug')
  debugUser(@GetUser() user: AuthenticatedUser) {
    return {
      message: 'Debug info',
      user,
      restaurantId: user.restaurantId,
      hasToken: true,
    };
  }

  @Post('review')
  createReview(
    @GetUser() user: AuthenticatedUser,
    @Body() dto: CreateReviewDto,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.reportsService.createReview(restaurantId, dto);
  }
}
