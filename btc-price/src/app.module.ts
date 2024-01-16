import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import typeorm from './config/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionsFilter } from './common/exeption-filters/all-exceptions.filter';
import { AppController } from './app.controller';
import { TimerModule } from './modules/timer/timer.module';
import { PriceModule } from './modules/price/price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, typeorm],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AppModule,
    TimerModule,
    PriceModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
