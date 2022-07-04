import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  /*@ManyToOne((type) => SchoolYear, (schoolYear) => schoolYear.career)
  schoolYear: SchoolYear;

  @OneToMany(
    (type) => TeacherCareerSubject,
    (teachercareersubject) => teachercareersubject.career,
  )
  teachercareersubject: TeacherCareerSubject[];

  teachercarers: number;*/

}
