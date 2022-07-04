import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity()
export class WeekdayDays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


//    @OneToMany((type) => Schedule, (schedule) => schedule.weekdaydays)
//    schedules: Schedule[];
//    schedule: number;

}
