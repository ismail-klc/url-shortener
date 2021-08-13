import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        JWT_KEY: Joi.string().required()
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_KEY'),
          signOptions: {
            expiresIn: '12h',
          },
        }
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthModule],
  exports: [JwtModule]

})
export class AppModule {
  constructor(private configService: ConfigService) { }
}
