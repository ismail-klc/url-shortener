import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { google, Auth } from 'googleapis';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {


    oauthClient: Auth.OAuth2Client;
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {
        const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        );
    }

    async googleAuth(data: any) {
        let existedUser = await this.usersRepository.findOne({ email: data.email });
        if (!existedUser) {
            existedUser = await this.usersRepository.save({
                email: data.email,
                isRegisteredWithGoogle: true,
                name: data.name
            });
        }

        return await this.jwtService.signAsync({
            id: existedUser.id,
            email: existedUser.email,
            isGoogleAuth: existedUser.isRegisteredWithGoogle
        });
    }

    async createUser(dto: CreateUserDto) {
        const existedUser = await this.usersRepository.findOne({ email: dto.email });
        if (existedUser) {
            throw new BadRequestException('This email is already registered');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const newUser = this.usersRepository.create({
            ...dto,
            password: hashedPassword
        });
        await this.usersRepository.save(newUser);

        delete newUser.password;
        return newUser;
    }

    async signIn(signInDto: SignInDto) {
        // check email is already registered
        const existedUser = await this.usersRepository.findOne({ email: signInDto.email });
        if (!existedUser) {
            throw new BadRequestException(['Wrong password or email']);
        }

        if (existedUser.isRegisteredWithGoogle) {
            throw new BadRequestException('This email is registered with Google');
        }

        // compare passwords
        if (!await bcrypt.compare(signInDto.password, existedUser.password)) {
            throw new BadRequestException(['Wrong password or email']);
        }

        // return signed jwt token
        return await this.jwtService.signAsync({
            id: existedUser.id,
            email: existedUser.email,
            isGoogleAuth: existedUser.isRegisteredWithGoogle
        });
    }
}
