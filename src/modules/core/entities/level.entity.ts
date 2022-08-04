import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CourseEntity } from '@core/entities';

@Entity('levels', { schema: 'core' })
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del nivel',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del nivel',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del nivel',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    comment: 'Fecha de eliminacion del nivel',
  })
  deletedAt: Date;

  @OneToMany(() => CourseEntity, (course) => course.level)
  courses: CourseEntity[];
}
