import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from 'src/assignment-classroom/dtos/classroom.dto';
import { UpdateClassroomDto } from 'src/assignment-classroom/dtos/classroom.dto';
import { Classroom } from 'src/assignment-classroom/entities/classroom.entity';

@Injectable()
export class ClassroomsService {

    private countIdClassroom = 1;

    private classrooms: Classroom[] = [{
        id: 1,
        name: "Lunes"
    }]
    /** Buscar todo */
    findAll(): Classroom[] {

        return this.classrooms;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.classrooms.find((item) => item.id);
    }
    /**Create */
    getId(id: number): Classroom {
        return this.classrooms.find( (item: Classroom) => item.id == id);
      }

    create(payload: CreateClassroomDto) {

        this.countIdClassroom = this.countIdClassroom + 1;
        const newClassroom = {
            id: this.countIdClassroom,
            ...payload,
        };
        this.classrooms.push(newClassroom);
        return newClassroom;

    }

    /**UPDATE */

  update(id: number, payload: UpdateClassroomDto) {

   const Classroom = this.findOne(id);
    if (Classroom) {     const index = this.classrooms.findIndex((item) => item.id === id);
     this.classrooms[index] = {
        ...Classroom,         ...payload,       };
       return this.classrooms[index];
     }
    return null;
 }

// update(id: number, body: any) {
//     let product: Classroom = {
//       id,
//       name: body.name,
      
//     }
//     this.Classrooms = this.Classrooms.map( (item: Classroom) => {
//       console.log(item, id, item.id == id);
//       return item.id == id ? product : item;
//     });
//   }
    /**DELETE  */

    delete(id: number) {
        const indexClassroom = this.classrooms.findIndex((item) => item.id === id);//
        if (indexClassroom===-1){
            throw new NotFoundException(`Producto ${id} no encontrado`)
        }

       this.classrooms.splice(indexClassroom,1);
       return true;
    }
}

