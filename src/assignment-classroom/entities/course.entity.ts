import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { Level } from './level.entity';
import { Subject } from './subject.entity';

@Entity()
export class Course {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 /*@ManyToOne(type => Level, level => level.course) level: Level; */

 /*@OneToMany(type => Subject, subject => subject.day) subjects: Subject[];  
 subject: number;*/

}