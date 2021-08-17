import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'clicks_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:5000',
    credentials: true
  });

  await app.startAllMicroservices();
  await app.listen(3003, () => {
    console.log("listening on port 3003");
  });
}
bootstrap();
