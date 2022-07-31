import { HourEntity } from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('schedule_positions', { schema: 'state_schema' })
export class SchedulePositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => HourEntity, (hour) => hour.schedulePosition)
  schedulePositions: HourEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Codigo de la posicion del horario',
    name: 'code',
  })
  code: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la posicion del horario',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la posicion del horario',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la posicion del horario',
  })
  deletedAt: Date;
}
