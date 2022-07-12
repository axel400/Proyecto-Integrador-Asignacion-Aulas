import { TeacherCareerSubject } from '../../teacher-career-subject/entities/teacher-career-subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

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

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamptz',
  })
  deleteAt: Date;

  @OneToMany(() => TeacherCareerSubject, (teacherCareerSubject) => teacherCareerSubject.teacher)
  teacherCareerSubjects: TeacherCareerSubject[];

}
