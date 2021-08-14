import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity()
export class UrlEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true})
    shortUrl: string;

    @Column()
    originalUrl: string;

    @Column()
    userId: number;

    @Column({ nullable: true })
    expirationDate: Date;
}