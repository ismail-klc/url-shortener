import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const token = request.cookies.jwt;


    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      console.log(error);
      
      throw new UnauthorizedException();
    }

    return true;
  }

}