import {
    Body, Controller, Delete, Get,
    HttpCode, Param, Post, Query, Req, UseGuards
} from '@nestjs/common';
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
        return this.urlService.createUrl(dto, req.user.id);
    }

    @Get()
    @HttpCode(200)
    getOriginalUrl(@Query() query) {
        return this.urlService.getOriginalUrl(query.url);
    }

    @Get('my-urls')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getUrlsByUser(@Req() req: Request,) {
        return this.urlService.getUrlsByUserId(req.user.id);
    }

    @Delete(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    deleteUrl(@Param() params) {
        return this.urlService.deleteUrlById(params.id);
    }
}
