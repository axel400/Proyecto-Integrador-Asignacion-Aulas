import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TeacherCareerSubject } from './teacherCareerSubject.entity';

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
  /*@OneToMany(
    (type) => TeacherCareerSubject,
    (teachercareersubject) => teachercareersubject.career,
  )
  teachercareersubject: TeacherCareerSubject[];
  teachercarers: number;*/
}
