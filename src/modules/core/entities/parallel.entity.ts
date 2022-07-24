import { CourseEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('parallels', { schema: 'core' })
export class ParallelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CourseEntity, (course) => course.parallel)
  courses: CourseEntity[];

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del paralelo',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del paralelo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del paralelo',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del paralelo',
  })
  deletedAt: Date;
}
