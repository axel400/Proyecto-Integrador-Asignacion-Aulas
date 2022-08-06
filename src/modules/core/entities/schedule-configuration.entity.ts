import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ClassroomEntity, ColorEntity, DayEntity, HourEntity, RequestEntity, StateEntity } from '@core/entities';

@Entity('schedule_configurations', { schema: 'core' })
export class ScheduleConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColorEntity, (color) => color.scheduleConfigurations)
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ManyToOne(() => DayEntity, (day) => day.scheduleConfigurations)
  @JoinColumn({ name: 'day_id' })
  day: DayEntity;

  @ManyToOne(() => HourEntity, (hour) => hour.scheduleConfigurations)
  @JoinColumn({ name: 'hour_id' })
  hour: HourEntity;

  @ManyToOne(() => ClassroomEntity, (classroom) => classroom.scheduleConfigurations)
  @JoinColumn({ name: 'classroom_id' })
  classroom: ClassroomEntity;

  @ManyToOne(() => StateEntity, (state) => state.scheduleConfigurations)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @ManyToOne(() => RequestEntity, (request) => request.scheduleConfigurations)
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
