import { CourseEntity, RequestEntity, StateEntity, SubjectEntity, TeacherDistributionEntity } from '@core/entities';
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

@Entity('teachers', { schema: 'core' })
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Tarjeta de identificacion del docente',
    name: 'id_card',
  })
  idCard: string;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del docente',
    name: 'name',
  })
  name: string;

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
    comment: 'Fecha de eliminacion del docente',
  })
  deletedAt: Date;

  @ManyToOne(() => StateEntity, (state) => state.teachers)
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @OneToMany(() => TeacherDistributionEntity,(teacherDistribution) => teacherDistribution.teacher)
  teacherDistributions: TeacherDistributionEntity[];

  @OneToMany(() => SubjectEntity, (subject) => subject.teacher)
  subjects: SubjectEntity[];

  @OneToMany(() => CourseEntity, (course) => course.tutor)
  courses: CourseEntity[];

  @OneToMany(() => RequestEntity, (request) => request.teacher)
  requests: RequestEntity[];
}
