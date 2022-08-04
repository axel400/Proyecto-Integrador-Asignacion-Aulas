import {
  ClassroomEntity,
  HourEntity,
  RequestEntity,
  ScheduleConfigurationEntity,
  SchoolYearEntity,
  TeacherEntity,
} from '@core/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('statues', { schema: 'core' })
export class StateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del estado',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del estado',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del estado',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion del estado',
  })
  deletedAt: Date;

  @OneToMany(() => SchoolYearEntity, (schoolyear) => schoolyear.state)
  schoolyears: SchoolYearEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.state)
  teachers: TeacherEntity[];

  @OneToMany(() => ClassroomEntity, (classroom) => classroom.state)
  classrooms: ClassroomEntity[];

  @OneToMany(() => ScheduleConfigurationEntity, (scheduleConfiguration) => scheduleConfiguration.state)
  scheduleConfigurations: ScheduleConfigurationEntity[];

  @OneToMany(() => RequestEntity, (request) => request.state)
  requests: RequestEntity[];

  @OneToMany(() => HourEntity, (hour) => hour.state)
  hours: HourEntity[];
}
