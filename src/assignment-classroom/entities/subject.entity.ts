import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { Day } from './day.entity';
import { TeacherCareerSubject } from './teacherCareerSubject.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @ManyToOne((type) => Course, (course) => course.subject) course: Course;

  // @ManyToOne((type) => Day, (day) => day.subject) day: Day;
  // @OneToMany(
  //   (type) => TeacherCareerSubject,
  //   (teachercareersubject) => teachercareersubject.subject,
  // )
  // teachercareersubjects: TeacherCareerSubject[];
  // teachercarers: number;
}
