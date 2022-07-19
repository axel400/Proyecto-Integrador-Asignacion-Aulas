import { TeacherCareerSubjectEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('teachers')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Tarjeta de identificacion del docente',
    name: 'idCard',
  })
  idCard: string;

  @Column('varchar', {
    length: 255,
    comment: 'Correo del docente',
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    length: 255,
    comment: 'Número de telefomo del docente',
    name: 'telephone',
  })
  telephone: string;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del docente',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del docente',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del docente',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del docente',
  })
  deletedAt: Date;

  @OneToMany(() => TeacherCareerSubjectEntity, (teacherCareerSubject) => teacherCareerSubject.teacher)
  teacherCareerSubjects: TeacherCareerSubjectEntity[];

}
