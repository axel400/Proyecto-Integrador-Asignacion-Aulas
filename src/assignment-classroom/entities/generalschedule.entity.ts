import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  schedule: Schedule;
*/
}
