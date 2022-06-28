import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Classroom } from './classroom.entity';
import { Schedule } from './schedule.entity';
import { TeacherCareerSubject } from './teacherCareerSubject.entity';

@Entity()
export class GeneralSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  /*@ManyToOne((type) => Classroom, (classroom) => classroom.generalschedule)

  classroom: Classroom;

  @ManyToOne(
    (type) => TeacherCareerSubject,
    (teachercareersubject) => teachercareersubject.generalschedule,
  )
  teachercareersubject: TeacherCareerSubject;

  @ManyToOne((type) => Schedule, (schedule) => schedule.generalschedule)
  schedule: Schedule;*/

}
