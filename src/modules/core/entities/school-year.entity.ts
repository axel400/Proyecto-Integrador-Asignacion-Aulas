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
import {
  RequestEntity,
  StateEntity,
  TeacherDistributionEntity,
} from '@core/entities';

@Entity('school_year', { schema: 'state_schema' })
export class SchoolYearEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => StateEntity, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @OneToMany(() => RequestEntity, (request) => request.schoolYear)
  requests: RequestEntity[];

  @OneToMany(
    () => TeacherDistributionEntity,
    (teacherDistribution) => teacherDistribution.schoolYear,
  )
  teacherDistributions: TeacherDistributionEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del año lectivo',
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha inicio',
    name: 'start_date',
  })
  startDate: string;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha fin',
    name: 'end_date',
  })
  endDate: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del año lectivo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del año lectivo',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: false,
    comment: 'Fecha de eliminacion del año lectivo',
  })
  deletedAt: Date;
}
