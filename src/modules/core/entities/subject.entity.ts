import { CourseEntity, JourneyEntity, TeacherCareerSubjectEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';

@Entity('subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Descripción de la materia',
    name: 'description',
  })
  description: string;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre de la materia',
    name: 'name',
  })
  name: string;

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

  @ManyToOne(() => JourneyEntity, { nullable: true })
  @JoinColumn({ name: 'journey_id' })
  journey: JourneyEntity;

  @ManyToOne(() => CourseEntity, { nullable: true })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @OneToMany(() => TeacherCareerSubjectEntity, (teacherCareerSubject) => teacherCareerSubject.subject)
  teacherCareerSubjects: TeacherCareerSubjectEntity[];

}
