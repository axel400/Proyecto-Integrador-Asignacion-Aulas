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
  RequestEntity,
  StateEntity,
} from '@core/entities';

@Entity('schedule_configurations', { schema: 'core' })
export class ScheduleConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColorEntity, { nullable: true })
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ManyToOne(() => DayEntity, { nullable: true })
  @JoinColumn({ name: 'day_id' })
  day: DayEntity;

  @ManyToOne(() => HourEntity, { nullable: true })
  @JoinColumn({ name: 'hour_id' })
  hour: HourEntity;

  @ManyToOne(() => ClassroomEntity, { nullable: true })
  @JoinColumn({ name: 'classroom_id' })
  classroom: ClassroomEntity;

  @ManyToOne(() => StateEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @ManyToOne(() => RequestEntity, { nullable: true })
  @JoinColumn({ name: 'request_id' })
  request: RequestEntity;

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
    nullable: true,
    comment: 'Fecha de eliminacion de la configuracion del horario',
  })
  deletedAt: Date;
}
