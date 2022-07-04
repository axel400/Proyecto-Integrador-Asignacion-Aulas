import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  // @OneToMany((type) => Subject, (subject) => subject.day) subjects: Subject[];
  // subject: number;
}
