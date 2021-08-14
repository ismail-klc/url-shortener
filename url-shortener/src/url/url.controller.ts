import { Body, Controller, Get, HttpCode, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { Request } from 'express';
import { CreateUrlDto } from './dtos/create-url.dto';
import { AuthGuard } from './guards/auth.guard';

declare global {
    namespace Express {
        interface User {
            id: number;
}

        interface Request {
            user?: User | undefined;
        }
    }
}

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    @Post('create')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    createUrl(@Req() req: Request, @Body() dto: CreateUrlDto) {
        console.log(dto);
        
        return this.urlService.createUrl(dto, req.user.id);
    }

    @Get()
    @HttpCode(200)
    getOriginalUrl(@Query() query) {
        return this.urlService.getOriginalUrl(query.url);
    }
}
