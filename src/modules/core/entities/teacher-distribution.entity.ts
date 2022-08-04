import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  CourseEntity,
  SchoolYearEntity,
  SubjectEntity,
  TeacherEntity,
} from '@core/entities';

@Entity('teacher_distributions', { schema: 'core' })
export class TeacherDistributionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la distribucion de docentes',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la distribucion de docentes',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion de la distribucion de docentes',
  })
  deletedAt: Date;

  @ManyToOne(() => SchoolYearEntity, (schoolYear) => schoolYear.teacherDistributions)
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYearEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.teacherDistributions)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => CourseEntity, (course) => course.teacherDistributions)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.teacherDistributions)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;
}
