import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ScheduleConfigurationEntity } from '@core/entities';

@Entity('days', { schema: 'core' })
export class DayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del día',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del día',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del día',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion del día',
  })
  deletedAt: Date;

  @OneToMany(() => ScheduleConfigurationEntity, (scheduleConfiguration) => scheduleConfiguration.day)
  scheduleConfigurations: ScheduleConfigurationEntity[];
}
