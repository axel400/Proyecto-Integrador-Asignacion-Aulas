import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Level {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

//  @OneToMany(type => Course, course => course.level) courses: Course[];  
//  course: number;

}