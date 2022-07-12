import { Schedule } from '../../schedule/entities/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Classroom } from '../../classroom/entities/classroom.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamptz',
  })
  deleteAt: Date;

  @OneToMany(() => Classroom, (classroom) => classroom.status)
  classrooms: Classroom[];

  @OneToMany(() => Schedule, (schedule) => schedule.status)
  schedules: Schedule[];

}
