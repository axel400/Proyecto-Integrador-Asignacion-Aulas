
import { SchoolYear } from '../../school-year/entities/school-year.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { TeacherCareerSubject } from '../../teacher-career-subject/entities/teacher-career-subject.entity';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.careers)
  @JoinColumn({ name: 'schoolYear_id' })
  schoolYear: SchoolYear;

  @OneToMany(() => TeacherCareerSubject, (teacherCareerSubject) => teacherCareerSubject.career)
  teacherCareerSubjects: TeacherCareerSubject[];

}
