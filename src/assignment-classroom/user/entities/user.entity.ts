import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()  
    id: number;
  
    @Column()
    email: string;
  
  
    @Column()
    password: string;
  
  
    @Column()
    role: string;
  
  }
  