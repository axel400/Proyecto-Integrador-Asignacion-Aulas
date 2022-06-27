import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Day {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 @OneToMany(type => Subject, subject => subject.day) subjects: Subject[];  
 subject: number;
}