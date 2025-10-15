import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer, CustomerSchema } from '../schemas/customer.schema';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import {
  RestaurantAdmin,
  RestaurantAdminSchema,
} from '../schemas/restaurant-admin.schema';
import {
  DeliveryPersonnel,
  DeliveryPersonnelSchema,
} from '../schemas/delivery-personnel.schema';
import { JwtStrategy } from '../common/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
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
      { name: RestaurantAdmin.name, schema: RestaurantAdminSchema },
      { name: DeliveryPersonnel.name, schema: DeliveryPersonnelSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
