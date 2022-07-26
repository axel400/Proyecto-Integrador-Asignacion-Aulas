import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  ClassroomEntity,
  ColorEntity,
  DayEntity,
  HourEntity,
  StateEntity,
  TeacherDistributionEntity,
} from '@core/entities';

@Entity('schedule_configurations', { schema: 'core' })
export class ScheduleConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColorEntity, { nullable: false })
  //@JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ManyToOne(() => DayEntity, { nullable: false })
  //@JoinColumn({ name: 'day_id' })
  day: DayEntity;

  @ManyToOne(() => HourEntity, { nullable: false })
  //@JoinColumn({ name: 'hour_id' })
  hour: HourEntity;

  @ManyToOne(() => ClassroomEntity, { nullable: false })
  //@JoinColumn({ name: 'classroom_id' })
  classroom: ClassroomEntity;

  @ManyToOne(() => StateEntity, { nullable: false })
  //@JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @ManyToOne(() => TeacherDistributionEntity, { nullable: false })
  //@JoinColumn({ name: 'teacher_distribution_id' })
  teacherDistribution: TeacherDistributionEntity;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha',
    name: 'date',
  })
  date: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la configuracion del horario',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la configuracion del horario',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: false,
    comment: 'Fecha de eliminacion de la configuracion del horario',
  })
  deletedAt: Date;
}
