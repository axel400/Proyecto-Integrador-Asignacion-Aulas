import { SchoolYearEntity, TeacherCareerSubjectEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';

@Entity('careers')
export class CareerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre de la carrera',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  @ManyToOne(() => SchoolYearEntity, { nullable: true })
  @JoinColumn({ name: 'schoolYear_id' })
  schoolYear: SchoolYearEntity;

  @OneToMany(() => TeacherCareerSubjectEntity, (teacherCareerSubject) => teacherCareerSubject.career)
  teacherCareerSubjects: TeacherCareerSubjectEntity[];

}
