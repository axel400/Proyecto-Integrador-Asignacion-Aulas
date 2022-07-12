import { Status } from '../../status/entities/status.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { GeneralSchedule } from '../../general-schedule/entities/general-schedule.entity';

@Entity()
export class Classroom {
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

  @ManyToOne(() => Status, (status) => status.classrooms)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => GeneralSchedule, (generalSchedule) => generalSchedule.classroom)
  generalSchedules: GeneralSchedule[];

}
