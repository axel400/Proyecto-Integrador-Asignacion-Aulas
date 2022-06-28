import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { GeneralSchedule } from './generalschedule.entity';
import { Status } from './status.entity';
import { WeekdayDays } from './weekdays.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  /*@ManyToOne((type) => Status, (status) => status.schedule) status: Status;
  // @ManyToOne((type) => WeekdayDays, (weekdaydays) => weekdaydays.schedule)
  // weekdaydays: WeekdayDays;

  @OneToMany(
    (type) => GeneralSchedule,
    (generalschedule) => generalschedule.schedule,
  )
  generalschedules: GeneralSchedule[];
  generalschedule: number;*/
}
