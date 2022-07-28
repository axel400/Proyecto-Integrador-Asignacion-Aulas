import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {
  CareerEntity,
  LevelEntity,
  ParallelEntity,
  SchoolDayEntity,
  TeacherDistributionEntity,
} from '@core/entities';

@Entity('courses', { schema: 'core' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LevelEntity, { nullable: false })
  @JoinColumn({ name: 'level_id' })
  level: LevelEntity;

  @ManyToOne(() => SchoolDayEntity, { nullable: false })
  @JoinColumn({ name: 'school_day_id' })
  schoolDay: SchoolDayEntity;

  @ManyToOne(() => ParallelEntity, { nullable: false })
  @JoinColumn({ name: '	parallel_id' })
  parallel: ParallelEntity;

  @ManyToOne(() => CareerEntity, { nullable: false })
  @JoinColumn({ name: '	career_id' })
  career: CareerEntity;

  @OneToMany(
    () => TeacherDistributionEntity,
    (teacherDistribution) => teacherDistribution.course,
  )
  teacherDistributions: TeacherDistributionEntity[];

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
    nullable: false,
    comment: 'Fecha de eliminacion del curso',
  })
  deletedAt: Date;
}
