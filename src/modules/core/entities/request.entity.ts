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
import { RequestDetailEntity, SchoolYearEntity } from '@core/entities';

@Entity('requests', { schema: 'core' })
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolYearEntity, { nullable: true })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYearEntity;

  @OneToMany(
    () => RequestDetailEntity,
    (requestDetail) => requestDetail.teacherDistribution,
  )
  requestDetails: RequestDetailEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Fecha de la solicitud',
    name: 'date',
  })
  date: string;

  @Column('varchar', {
    length: 255,
    comment: 'Total de horas solicitadas',
    name: 'total_hours_requested',
  })
  totalHoursRequested: string;

  @Column('varchar', {
    length: 255,
    comment: 'Carrera',
    name: 'career',
  })
  career: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la solicitud',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la solicitud',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la solicitud',
  })
  deletedAt: Date;
}
