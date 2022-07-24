import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CourseEntity, RequestDetailEntity, ScheduleConfigurationEntity, SchoolDayEntity, SubjectEntity, TeacherEntity } from '@core/entities';

@Entity('teacherDistributions', { schema: 'core' })
export class TeacherDistributionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolDayEntity, { nullable: true })
  @JoinColumn({ name: 'school_day_id' })
  schoolDay: SchoolDayEntity;

  @ManyToOne(() => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => CourseEntity, { nullable: true })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @ManyToOne(() => TeacherEntity, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @OneToMany(() => ScheduleConfigurationEntity, (scheduleConfiguration) => scheduleConfiguration.teacherDistribution)
  scheduleConfigurations: ScheduleConfigurationEntity[];

  @OneToMany(() => RequestDetailEntity, (requestDetail) => requestDetail.teacherDistribution)
  requestDetails: RequestDetailEntity[];

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
    nullable: true,
    comment: 'Fecha de eliminacion de la distribucion de docentes',
  })
  deletedAt: Date;
}