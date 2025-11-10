import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer, CustomerSchema } from '../schemas/customer.schema';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import {
  DeliveryPersonnel,
  DeliveryPersonnelSchema,
} from '../schemas/delivery-personnel.schema';
import { Restaurant, RestaurantSchema } from '../schemas/restaurant.schema';
import { SuperAdmin, SuperAdminSchema } from '../schemas/super-admin.schema';
import { JwtStrategy } from '../common/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') ?? '7d',
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: DeliveryPersonnel.name, schema: DeliveryPersonnelSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: SuperAdmin.name, schema: SuperAdminSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
