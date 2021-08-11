import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: { expiresIn: '6h' }
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
export class AppModule {}
