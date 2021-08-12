import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public name: string;
 
  @Column({ nullable: true})
  @Exclude()
  public password?: string;
  
  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;
}
 