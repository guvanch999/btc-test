import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptor/time-log.interceptor';
import { TimerService } from './modules/timer/TimerService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const timerService = app.get(TimerService);
  const port = configService.get('port');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Bitcoin price OpenApi')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  timerService.start();
  await app.listen(port);
}

bootstrap();
