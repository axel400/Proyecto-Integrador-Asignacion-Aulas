import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import {
  CareerEntity,
  LevelEntity,
  ParallelEntity,
  RequestEntity,
  SchoolDayEntity,
  TeacherDistributionEntity,
  TeacherEntity,
} from '@core/entities';

@Entity('courses', { schema: 'core' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del curso',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del curso',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del curso',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion del curso',
  })
  deletedAt: Date;

  @ManyToOne(() => LevelEntity, (level) => level.courses)
  @JoinColumn({ name: 'level_id' })
  level: LevelEntity;

  @ManyToOne(() => SchoolDayEntity, (schoolDay) => schoolDay.courses)
  @JoinColumn({ name: 'school_day_id' })
  schoolDay: SchoolDayEntity;

  @ManyToOne(() => ParallelEntity, (parallel) => parallel.courses)
  @JoinColumn({ name: 'parallel_id' })
  parallel: ParallelEntity;

  @ManyToOne(() => CareerEntity, (career) => career.courses)
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @ManyToOne(() => TeacherEntity, (tutor) => tutor.courses)
  @JoinColumn({ name: 'tutor_id' })
  tutor: TeacherEntity;

  @OneToMany(() => TeacherDistributionEntity, (teacherDistribution) => teacherDistribution.course)
  teacherDistributions: TeacherDistributionEntity[];

  @OneToMany(() => RequestEntity, (request) => request.course)
  requests: RequestEntity[];
}
