
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Level } from '../../level/entities/level.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Course {

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

  @ManyToOne(() => Level, (level) => level.courses)
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects: Subject[];

}

