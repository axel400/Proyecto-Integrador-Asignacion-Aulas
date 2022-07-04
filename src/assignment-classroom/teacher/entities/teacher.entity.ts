import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()

  id: number;

  @Column()
  idCard: string;


  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  // @OneToMany(
  //   (type) => TeacherCareerSubject,
  //   (teachercareersubject) => teachercareersubject.career,
  // )
  // teachercareersubject: TeacherCareerSubject[];
  // teachercarers: number;

}
