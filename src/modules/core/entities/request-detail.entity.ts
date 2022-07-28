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
  RequestEntity,
  StateEntity,
  TeacherDistributionEntity,
} from '@core/entities';

@Entity('request_details', { schema: 'core' })
export class RequestDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RequestEntity, { nullable: true })
  @JoinColumn({ name: 'request_id' })
  request: RequestEntity;

  @ManyToOne(() => TeacherDistributionEntity, { nullable: true })
  @JoinColumn({ name: 'teacher_distribution_id' })
  teacherDistribution: TeacherDistributionEntity;

  @ManyToOne(() => StateEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha inicio',
    name: 'start_date',
  })
  startDate: string;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha final',
    name: 'end_date',
  })
  endDate: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del detalle de la solicitud',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del detalle de la solicitud',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del detalle de la solicitud',
  })
  deletedAt: Date;
}
