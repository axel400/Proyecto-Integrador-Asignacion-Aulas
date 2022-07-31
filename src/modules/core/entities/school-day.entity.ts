import { CourseEntity, TimeSettingEntity } from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('school_days', { schema: 'course_schema' })
export class SchoolDayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CourseEntity, (course) => course.schoolDay)
  courses: CourseEntity[];

  @OneToMany(() => TimeSettingEntity, (timeSetting) => timeSetting.schoolDay)
  timeSettings: TimeSettingEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre de la jornada',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la jornada',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la jornada',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la jornada',
  })
  deletedAt: Date;
}
