import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Career } from './career.entity';

@Entity()
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /*@OneToMany((type) => Career, (career) => career.schoolYear) careers: Career[];
  career: number;*/
}
