import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { WeekdayDays } from '../../weekdays/entities/weekdays.entity';

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

  // @ManyToOne((type) => Status, (status) => status.schedule) status: Status;
  // @ManyToOne((type) => WeekdayDays, (weekdaydays) => weekdaydays.schedule)
  // weekdaydays: WeekdayDays;

  // @OneToMany(
  //   (type) => GeneralSchedule,
  //   (generalschedule) => generalschedule.schedule,
  // )
  // generalschedules: GeneralSchedule[];
  // generalschedule: number;
}
