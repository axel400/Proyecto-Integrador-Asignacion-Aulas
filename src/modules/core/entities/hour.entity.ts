import { ScheduleConfigurationEntity, StateEntity } from '@core/entities';
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
import { SchedulePositionEntity } from './schedule-position.entity';

@Entity('hours', { schema: 'state_schema' })
export class HourEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => SchedulePositionEntity, { nullable: false })
  @JoinColumn({ name: 'schedulePosition_id' })
  schedulePosition: SchedulePositionEntity;

  @ManyToOne(() => StateEntity, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @OneToMany(
    () => ScheduleConfigurationEntity,
    (scheduleConfiguration) => scheduleConfiguration.hour,
  )
  scheduleConfigurations: ScheduleConfigurationEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Hora',
    name: 'hora',
  })
  hour: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la hora',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la hora',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: false,
    comment: 'Fecha de eliminacion de la hora',
  })
  deletedAt: Date;
}
