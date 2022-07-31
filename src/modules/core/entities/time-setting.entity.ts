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
import { CareerEntity, SchoolDayEntity } from '@core/entities';

@Entity('time_settings', { schema: 'course_schema' })
export class TimeSettingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => CareerEntity, { nullable: false })
  @JoinColumn({ name: 'career_id' })
  career: CareerEntity;

  @ManyToOne(() => SchoolDayEntity, { nullable: false })
  @JoinColumn({ name: 'school_day_id' })
  schoolDay: SchoolDayEntity;

  @Column('varchar', {
    length: 255,
    comment: 'Horas semanales',
    name: 'weekly_hours',
  })
  weeklyHours: string;

  @Column('varchar', {
    length: 255,
    comment: 'Horas ocupadas',
    name: 'hours_used',
  })
  hoursUsed: string;

  @Column('varchar', {
    length: 255,
    comment: 'Horas disponibles',
    name: 'hours_available',
  })
  hoursAvailable: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la configuracion de tiempo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la configuracion de tiempo',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: false,
    comment: 'Fecha de eliminacion de la configuracion de tiempo',
  })
  deletedAt: Date;
}
