import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { Day } from './day.entity';


@Entity()
export class Subject {
 @PrimaryGeneratedColumn()
 idCard: number;

 @Column()
 name: string;

 @Column()
 description: string;

 @ManyToOne(type => Course, course=> course.subject) course: Course; 

 @ManyToOne(type => Day, day=> day.subject) day: Day; 

}