import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
} from 'src/assignment-classroom/teacher/dtos/teacher.dto';
import { Teacher } from 'src/assignment-classroom/teacher/entities/teacher.entity';

@Injectable()
export class TeacherService {
  private countIdTeacher = 1;

  private teacher: Teacher[] = [
    {
      id: 1,
      idCard: '1752478451',
      name: 'Lunes',
      email: 'kevin@gmial.com',
      telephone: '0123456789',
    },
  ];
  /** Buscar todo */
  findAll(): Teacher[] {
    return this.teacher;
  }

  /**Buscar por id */

  findOne(id: number) {
    return this.teacher.find((item) => item.id);
  }
  /**Create */
  getId(id: number): Teacher {
    return this.teacher.find((item: Teacher) => item.id == id);
  }

  create(payload: CreateTeacherDto) {
    this.countIdTeacher = this.countIdTeacher + 1;
    const newTeacher = {
      id: this.countIdTeacher,
      ...payload,
    };
    this.teacher.push(newTeacher);
    return newTeacher;
  }

  /**UPDATE */

  // update(id: number, payload: UpdateTeacherDto) {
  //   const Teacher = this.findOne(id);
  //   if (Teacher) {
  //     const index = this.teacher.findIndex((item) => item.id === id);
  //     this.teacher[index] = {
  //       ...Teacher,
  //       ...payload,
  //     };
  //     return this.teacher[index];
  //   }
  //   return null;
  // }

   update(id: number, body: any) {
       let teachers: Teacher = {
         id,
         name: body.name, 
         idCard: body.idCard, 
         email: body.email, 
         telephone: body.telephone, 

       }
       this.teacher = this.teacher.map( (item: Teacher) => {
         console.log(item, id, item.id == id);
         return item.id == id ? teachers : item;
       });
       return teachers
     }
  /**DELETE  */

  delete(id: number) {
    const indexTeacher = this.teacher.findIndex((item) => item.id === id); //
    if (indexTeacher === -1) {
      throw new NotFoundException(`Profesor ${id} no encontrado`);
    }

    this.teacher.splice(indexTeacher, 1);
    return true;
  }
}
