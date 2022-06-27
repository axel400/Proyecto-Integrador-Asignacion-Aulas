import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SchoolYear } from './schoolYear.entity';

@Entity()
export class Career {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 @ManyToOne(type => SchoolYear, schoolYear => schoolYear.career) schoolYear: SchoolYear; 
}