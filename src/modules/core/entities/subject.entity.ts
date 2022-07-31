import { CareerEntity, RequestEntity, TeacherDistributionEntity, TeacherEntity } from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('subjects', { schema: 'course_schema' })
export class SubjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => CareerEntity, { nullable: true })
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @ManyToOne(() => TeacherEntity, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @OneToMany(() => TeacherDistributionEntity, (teacherDistribution) => teacherDistribution.subject)
  teacherDistributions: TeacherDistributionEntity[];

  @OneToMany(() => RequestEntity, (request) => request.subject)
  requests: RequestEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Codigo de la materia',
    name: 'code',
  })
  code: string;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre de la materia',
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    length: 255,
    comment: 'Horas teóricas',
    name: 'theoretical_hours',
  })
  theoreticalHours: string;

  @Column('varchar', {
    length: 255,
    comment: 'Horas prácticas',
    name: 'laboratory_hours',
  })
  laboratoryHours: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la materia',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la materia',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la materia',
  })
  deletedAt: Date;
}
