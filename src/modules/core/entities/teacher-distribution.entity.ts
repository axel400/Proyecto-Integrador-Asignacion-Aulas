import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { CourseEntity, RequestEntity, SchoolYearEntity, SubjectEntity, TeacherEntity } from '@core/entities';

@Entity('teacher_distributions', { schema: 'core' })
export class TeacherDistributionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolYearEntity, (schoolYear) => schoolYear.teacherDistributions)
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYearEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.teacherDistributions)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => CourseEntity, (course) => course.teacherDistributions)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.teacherDistributions)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @OneToMany(() => RequestEntity, (request) => request.teacherDistribution)
  requests: RequestEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del distributivo docente',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del distributivo docente',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del distributivo docente',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion del distributivo docente',
  })
  deletedAt: Date;
}
