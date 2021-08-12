import {
    Controller, Get, Post, Body, HttpCode,
    Res, UseGuards, Req, UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { TokenVerificationDto } from './dtos/token-verification.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    async login(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
        const jwt = await this.authService.signIn(signInDto);
        res.cookie('jwt', jwt, { httpOnly: true });

        return {
            msg: 'success'
        }
    }

    @Post('google')
    async googleAuth(@Body() data: any, @Res({ passthrough: true }) res: Response) {
        const jwt = await this.authService.googleAuth(data.profile);
        res.cookie('jwt', jwt, { httpOnly: true });

        return {
            msg: 'success'
        }
    }

    @Post('signup')
    @HttpCode(201)
    async signUp(@Body() signUpDto: CreateUserDto) {
        const newUser = await this.authService.createUser(signUpDto);

        return newUser;
    }

    @Post('signout')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    signOut(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('jwt');

        return {
            msg: 'success'
        }
    }

    @Get('me')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    currentUser(@Req() req: Request) {
        return req.user;
    }
}
