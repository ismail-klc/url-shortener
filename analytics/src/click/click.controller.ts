import { Get, Controller, Req, UseGuards, HttpCode } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ClickService } from './click.service';
import { AuthGuard } from './guards/auth.guard';
import { Request } from 'express';

export interface UrlData {
    shortUrl: string;
    userId: number;
}

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

@Controller('clicks')
export class ClickController {
    constructor(private readonly appService: ClickService) { }

    @EventPattern('url:clicked')
    async handleUrlClicked(data: UrlData) {
        const click = await this.appService.handleClicked(data);

        return click;
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getAnalytics(@Req() req: Request) {
        return this.appService.getAnalyticsByUser(req.user.id);
    }
}
