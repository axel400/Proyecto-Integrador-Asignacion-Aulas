import { ScheduleConfigurationEntity } from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('colors', { schema: 'schedule_configuration_schema' })
export class ColorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(
    () => ScheduleConfigurationEntity,
    (scheduleConfiguration) => scheduleConfiguration.color,
  )
  scheduleConfigurations: ScheduleConfigurationEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Codigo del color',
    name: 'code',
  })
  code: string;

  @Column('varchar', {
    length: 255,
    comment: 'Imagen',
    name: 'image',
  })
  image: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del color',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del color',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del color',
  })
  deletedAt: Date;
}
