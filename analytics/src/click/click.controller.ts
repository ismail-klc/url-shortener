import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ClickService } from './click.service';

interface UrlData {
    shortUrl: string;
}

@Controller('click')
export class ClickController {
    constructor(private readonly appService: ClickService) { }

    @EventPattern('url:clicked')
    async handleUrlClicked(data: UrlData) {
        console.log("url clicked", data);
        
        const click = await this.appService.handleClicked(data.shortUrl);
        // console.log(click);
        
        return click;
    }
}
