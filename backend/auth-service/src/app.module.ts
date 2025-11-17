import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { DeliveryManagementModule } from './delivery-management/delivery-management.module';
import { DeliveryFeesModule } from './delivery-fees/delivery-fees.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../../.env'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri:
          config.get<string>('MONGO_AUTH_URL'),
      }),
    }),
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
      path: 'metrics',
    }),
    AuthModule,
    UserManagementModule,
    DeliveryManagementModule,
    DeliveryFeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
