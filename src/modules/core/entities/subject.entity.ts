import { CareerEntity, TeacherDistributionEntity, TeacherEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';

@Entity('subjects', { schema: 'core' })
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CareerEntity, (career) => career.subjects)
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.subjects)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @OneToMany(() => TeacherDistributionEntity, (teacherDistribution) => teacherDistribution.subject)
  teacherDistributions: TeacherDistributionEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Codigo de la materia',
    name: 'code',
  })
  code: string;

  @Column('varchar', {
    length: 255, comment: 'Nombre de la materia',
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
    comment: 'Fecha de eliminacion de la materia',
  })
  deletedAt: Date;
}
