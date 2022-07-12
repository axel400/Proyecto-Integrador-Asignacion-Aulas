import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Day {
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

  @OneToMany(() => Schedule, (schedule) => schedule.day)
  schedules: Schedule[];
}
