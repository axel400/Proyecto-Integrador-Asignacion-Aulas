import { Journey } from '../../journey/entities/journey.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { TeacherCareerSubject } from '../../teacher-career-subject/entities/teacher-career-subject.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()

  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

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

  @ManyToOne(() => Journey, (journey) => journey.subjects)
  @JoinColumn({ name: 'journey_id' })
  journey: Journey;

  @ManyToOne(() => Course, (course) => course.subjects)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => TeacherCareerSubject, (teacherCareerSubject) => teacherCareerSubject.subject)
  teacherCareerSubjects: TeacherCareerSubject[];

}
