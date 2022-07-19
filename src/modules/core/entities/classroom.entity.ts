import { GeneralScheduleEntity, StatusEntity } from '@core/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('classrooms')
export class ClassroomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Nombre del aula',
    name: 'name',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del aula',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del aula',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del aula',
  })
  deletedAt: Date;

  @ManyToOne(() => StatusEntity, { nullable: true })
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  @OneToMany(() => GeneralScheduleEntity, (generalSchedule) => generalSchedule.classroom)
  generalSchedules: GeneralScheduleEntity[];

}
