import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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
