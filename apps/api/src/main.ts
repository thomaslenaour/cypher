import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const allowedOrigins = configService.get<RegExp[]>(
    'security.cors.allowedOrigins'
  );

  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (
  //       !origin ||
  //       allowedOrigins.some((allowedOrigin) => allowedOrigin.test(origin))
  //     ) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: ['GET', 'POST', 'OPTIONS'],
  //   credentials: true,
  // });

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
