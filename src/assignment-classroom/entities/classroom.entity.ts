import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Status } from './status.entity';

@Entity()
export class Classroom {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

@ManyToOne(type => Status, status => status.classroom) status: Status; 

}