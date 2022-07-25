import { LocationEntity, ScheduleConfigurationEntity } from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('classrooms', { schema: 'core' })
export class ClassroomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LocationEntity, { nullable: false })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  // @OneToMany(
  //   () => ScheduleConfigurationEntity,
  //   (scheduleConfiguration) => scheduleConfiguration.classroom,
  // )
  // scheduleConfigurations: ScheduleConfigurationEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del aula',
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    length: 255,
    comment: 'Capacidad del aula',
    name: 'capacity',
  })
  capacity: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del aula',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del aula',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: false,
    comment: 'Fecha de eliminacion del aula',
  })
  deletedAt: Date;
}
