import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RequestEntity, StateEntity, TeacherDistributionEntity } from '@core/entities';


@Entity('schoolYears', { schema: 'core' })
export class SchoolYearEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StateEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @OneToMany(() => RequestEntity, (request) => request.schoolYear)
  requests: RequestEntity[];

  @OneToMany(() => TeacherDistributionEntity, (teacherDistribution) => teacherDistribution.schoolDay)
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
  startDate: Date;

  @Column('varchar', {
    length: 255,
    comment: 'Fecha final',
    name: 'end_date',
  })
  endDate: Date;

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
    nullable: true,
    comment: 'Fecha de eliminacion del año lectivo',
  })
  deletedAt: Date;
}
