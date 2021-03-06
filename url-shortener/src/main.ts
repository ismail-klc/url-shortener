import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:5000',
    credentials: true
  });

  await app.listen(3002, () => {
    console.log("listening on port 3002");

  });
}
bootstrap();
