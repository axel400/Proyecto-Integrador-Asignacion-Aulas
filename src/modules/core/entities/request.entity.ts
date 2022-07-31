import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CareerEntity, CourseEntity, ScheduleConfigurationEntity, SchoolYearEntity, StateEntity, SubjectEntity, TeacherEntity } from '@core/entities';

@Entity('requests', { schema: 'state_schema' })
export class RequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => SchoolYearEntity, { nullable: false })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYearEntity;

  @ManyToOne(() => CareerEntity, { nullable: false })
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @ManyToOne(() => TeacherEntity, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => CourseEntity, { nullable: false })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @ManyToOne(() => SubjectEntity, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => StateEntity, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @OneToMany(
    () => ScheduleConfigurationEntity,
    (scheduleConfiguration) => scheduleConfiguration.request,
  )
  scheduleConfigurations: ScheduleConfigurationEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Fecha de la solicitud',
    name: 'date',
  })
  date: string;

  @Column('varchar', {
    length: 255,
    comment: 'Total de horas solicitadas',
    name: 'total_hours_requested',
  })
  totalHoursRequested: string;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha inicio',
    name: 'start_date',
  })
  startDate: string;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha fin',
    name: 'end_date',
  })
  endDate: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la solicitud',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la solicitud',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: false,
    comment: 'Fecha de eliminacion de la solicitud',
  })
  deletedAt: Date;
}
