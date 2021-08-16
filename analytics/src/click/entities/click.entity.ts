import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Click {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true })
    shortUrl: string;

    @Column()
    clicked: number;
}