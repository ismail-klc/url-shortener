import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

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

        // compare passwords
        if (!await bcrypt.compare(signInDto.password, existedUser.password)) {
            throw new BadRequestException(['Wrong password or email']);
        }

        // return signed jwt token
        return await this.jwtService.signAsync({ id: existedUser.id, email: existedUser.email });
    }
}
