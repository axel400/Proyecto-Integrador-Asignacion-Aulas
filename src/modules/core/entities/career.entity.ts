import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { CourseEntity, RequestEntity, SubjectEntity, TimeSettingEntity } from '@core/entities';

@Entity('careers', { schema: 'course_schema' })
export class CareerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SubjectEntity, (subject) => subject.career)
  subjects: SubjectEntity[];

  @OneToMany(() => TimeSettingEntity, (timeSetting) => timeSetting.career)
  timeSettings: TimeSettingEntity[];

  @OneToMany(() => CourseEntity, (course) => course.career)
  courses: CourseEntity[];

  @OneToMany(() => RequestEntity, (request) => request.career)
  requests: RequestEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre de la carrera',
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre de la carrera',
    name: 'duration_time',
  })
  durationTime: string;

  @Column('varchar', {
    length: 255,
    comment: 'Imagen',
    name: 'image',
  })
  image: string;

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
}
