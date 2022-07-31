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

@Entity('teacher_distributions', { schema: 'state_schema' })
export class TeacherDistributionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => SchoolYearEntity, { nullable: false })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYearEntity;

  @ManyToOne(() => SubjectEntity, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => CourseEntity, { nullable: false })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @ManyToOne(() => TeacherEntity, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

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
    nullable: false,
    comment: 'Fecha de eliminacion de la distribucion de docentes',
  })
  deletedAt: Date;
}
