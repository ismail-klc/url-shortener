import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    // logger: false
  });

  app.enableCors({
    origin: 'http://localhost:5000',
    credentials: true
  })

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001, async () => {
    console.log("listening on ", await app.getUrl());
  });
}
bootstrap();
