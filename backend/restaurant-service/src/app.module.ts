import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FoodItemsModule } from './food-items/food-items.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { join } from 'path';
import { existsSync } from 'fs';

const envFilePaths = [
  join(process.cwd(), '.env'),
  join(process.cwd(), '..', '.env'),
  join(process.cwd(), '..', '..', '.env'),
].filter((envPath) => existsSync(envPath));
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...(envFilePaths.length > 0 ? { envFilePath: envFilePaths } : {}),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_REST_URL'),
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    RestaurantsModule,
    FoodItemsModule,
    SuperAdminModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
