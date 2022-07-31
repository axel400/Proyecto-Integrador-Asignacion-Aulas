import { ClassroomEntity } from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('locations', { schema: 'schedule_configuration_schema' })
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(() => ClassroomEntity, (classroom) => classroom.location)
  classrooms: ClassroomEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del edificio',
    name: 'building_name',
  })
  buildingName: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del edificio',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del edificio',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del edificio',
  })
  deletedAt: Date;
}
