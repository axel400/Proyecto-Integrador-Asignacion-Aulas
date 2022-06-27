import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Teacher {
 @PrimaryGeneratedColumn()
 idCard: number;

 @Column()
 name: string;

 @Column()
 email: string;

 @Column()
 telephone: string;

}