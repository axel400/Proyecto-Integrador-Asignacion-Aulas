import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GeneralSchedule } from './generalschedule.entity';
import { Status } from './status.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  /*@ManyToOne((type) => Status, (status) => status.classroom) status: Status;


  @OneToMany(
    (type) => GeneralSchedule,
    (generalschedule) => generalschedule.classroom,
  )
  generalschedules: GeneralSchedule[];
  generalschedule: number;*/

}
