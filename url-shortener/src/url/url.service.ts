import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UrlEntity } from './entities/url.entity'
import { ObjectID } from 'mongodb';
import { CreateUrlDto } from './dtos/create-url.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UrlService {
    constructor(
        @Inject('URL_SHORTENER_SRV') private client: ClientProxy) { }

    async onApplicationBootstrap() {
        await this.client.connect();
    }

    async createUrl(dto: CreateUrlDto, userId: number) {
        const urlRepository = getMongoRepository(UrlEntity);
        let shortUrl: string;

        // if the user provides a short URL, check it if used before
        if (dto.shortUrl) {
            const existedUrl = await urlRepository.findOne({ shortUrl: dto.shortUrl });
            if (existedUrl) {
                throw new BadRequestException("This url was used before");
            }

            shortUrl = dto.shortUrl
        }
        else {
            shortUrl = new ObjectID().toString().slice(-6);
        }


        const url = await urlRepository.save({
            shortUrl: shortUrl,
            originalUrl: dto.originalUrl,
            expirationDate: dto.expirationDate,
            userId
        });
        return url;
    }

    async getOriginalUrl(shortUrl: string) {
        const urlRepository = getMongoRepository(UrlEntity);
        const existedUrl = await urlRepository.findOne({
            where: {
                shortUrl
            }
        });

        if (!existedUrl) {
            throw new NotFoundException('Url not found');
        }

        this.client.emit('url:clicked', existedUrl);

        return existedUrl;
    }

    async getUrlsByUserId(userId: number) {
        const urlRepository = getMongoRepository(UrlEntity);
        const urls = await urlRepository.find({
            where: {
                userId
            }
        });

        return urls;
    }
}
