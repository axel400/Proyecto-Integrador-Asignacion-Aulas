import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Classroom, (Classroom) => Classroom.status)
  classrooms: Classroom[];
  classroom: number;

  @OneToMany((type) => Schedule, (schedule) => schedule.status)
  schedules: Schedule[];
  schedule: number;
}
