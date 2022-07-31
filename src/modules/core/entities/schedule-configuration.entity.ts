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

@Entity('schedule_configurations', { schema: 'schedule_configuration_schema' })
export class ScheduleConfigurationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => ColorEntity, { nullable: false })
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ManyToOne(() => DayEntity, { nullable: false })
  @JoinColumn({ name: 'day_id' })
  day: DayEntity;

  @ManyToOne(() => HourEntity, { nullable: false })
  @JoinColumn({ name: 'hour_id' })
  hour: HourEntity;

  @ManyToOne(() => ClassroomEntity, { nullable: false })
  @JoinColumn({ name: 'classroom_id' })
  classroom: ClassroomEntity;

  @ManyToOne(() => StateEntity, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @ManyToOne(() => RequestEntity, { nullable: false })
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
    nullable: false,
    comment: 'Fecha de eliminacion de la configuracion del horario',
  })
  deletedAt: Date;
}
