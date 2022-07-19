import { DayEntity, GeneralScheduleEntity, StatusEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha',
    name: 'date',
  })
  date: string;

  @Column('varchar', {
    length: 255,
    comment: 'Hora de inicio',
    name: 'startTime',
  })
  startTime: string;

  @Column('varchar', {
    length: 255,
    comment: 'Hora de salida',
    name: 'endTime',
  })
  endTime: string;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del horario',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del horario',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del horario',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del horario',
  })
  deletedAt: Date;

  @ManyToOne(() => DayEntity, { nullable: true })
  @JoinColumn({ name: 'day_id' })
  day: DayEntity;

  @ManyToOne(() => StatusEntity, { nullable: true })
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  @OneToMany(() => GeneralScheduleEntity, (generalSchedule) => generalSchedule.schedule)
  generalSchedules: GeneralScheduleEntity[];
}
