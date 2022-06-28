import { Subject } from './subject.entity';

import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Career } from './career.entity';
import { Teacher } from './teacher.entity';
import { GeneralSchedule } from './generalschedule.entity';
@Entity()
export class TeacherCareerSubject {
  @PrimaryGeneratedColumn()
  id: number;


  /*@ManyToOne((type) => Career, (career) => career.teachercarers)
  career: Career;

  @ManyToOne((type) => Teacher, (teacher) => teacher.teachercarers)
  teacher: Teacher;

  @ManyToOne((type) => Subject, (subject) => subject.teachercarers)
  subject: Subject;

  @OneToMany(
    (type) => GeneralSchedule,
    (generalschedule) => generalschedule.teachercareersubject,
  )
  generalschedules: GeneralSchedule[];

  generalschedule: number;*/

}
