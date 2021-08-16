import { Injectable } from '@nestjs/common';
import { getManager, getMongoRepository } from 'typeorm';
import { Click } from './entities/click.entity';

@Injectable()
export class ClickService {
    async handleClicked(shortUrl: string) {
        try {
            const repository = getMongoRepository(Click); // or connection.manager

            let click = await repository.findOne({
                where: {
                    shortUrl
                }
            });

            if (!click) {
                return repository.save({
                    shortUrl,
                    clicked: 1
                });
            }

            click.clicked = click.clicked + 1;
            return repository.save(click);
        } catch (error) {
        }
    }
}
