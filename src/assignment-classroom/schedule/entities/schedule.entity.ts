import { Day } from '../../day/entities/day.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { GeneralSchedule } from '../../general-schedule/entities/general-schedule.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

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

  @ManyToOne(() => Day, (day) => day.schedules)
  @JoinColumn({ name: 'day_id' })
  day: Day;

  @ManyToOne(() => Status, (status) => status.schedules)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => GeneralSchedule, (generalSchedule) => generalSchedule.schedule)
  generalSchedules: GeneralSchedule[];
}
