import { Injectable } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UrlData } from './click.controller';
import { Click } from './entities/click.entity';

@Injectable()
export class ClickService {

    async getAnalyticsByUser(userId: number) {
        const repository = getMongoRepository(Click); 
        const clicks = await repository.find({
            where: {
                userId
            }
        })

        let myClicks = {}
        for (const click of clicks) {
            myClicks[click.shortUrl] = click.clicked
        }

        return myClicks;
    }

    async handleClicked(data: UrlData) {
        try {
            const repository = getMongoRepository(Click); 

            let click = await repository.findOne({
                where: {
                    shortUrl: data.shortUrl
                }
            });

            if (!click) {
                return repository.save({
                    shortUrl: data.shortUrl,
                    userId: data.userId,
                    clicked: 1
                });
            }

            click.clicked = click.clicked + 1;
            return repository.save(click);
        } catch (error) {
        }
    }
}
