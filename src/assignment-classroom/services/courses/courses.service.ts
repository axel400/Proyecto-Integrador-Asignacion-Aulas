import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from 'src/assignment-classroom/dtos/course.dto';
import { Course } from 'src/assignment-classroom/entities/course.entity';

@Injectable()
export class CoursesService {
    private countIdCourse = 1;

    private courses: Course[] = [{
        id: 1,
        name: "A"
    }]
    /** Buscar todo */
    findAll(): Course[] {
        return this.courses;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.courses.find((item) => item.id);
    }
    /**Create */
    getId(id: number): Course {
        return this.courses.find( (item: Course) => item.id == id);
      }

    create(payload: CreateCourseDto) {

        this.countIdCourse = this.countIdCourse + 1;
        const newCourse = {
            id: this.countIdCourse,
            ...payload,
        };
        this.courses.push(newCourse);
        return newCourse;

    }

    /**UPDATE */

//   update(id: number, payload: UpdateCourseDto) {

//    const course = this.findOne(id);
//     if (course) {     
//         const index = this.courses.findIndex((item) => item.id === id);
//         this.courses[index] = {
//         ...course,         
//         ...payload,       
//     };
//        return this.courses[index];
//      }
//     return null;
//  }

 update(id: number, body: any) {
    let courses: Course = {
      id,
      name: body.name,
     
    }
    this.courses = this.courses.map( (item: Course) => {
      console.log(item, id, item.id == id);
      return item.id == id ? courses : item;
    });
    return courses
  }


    /**DELETE  */

    delete(id: number) {
        const indexCourse = this.courses.findIndex((item) => item.id === id);//
        if (indexCourse===-1){
            throw new NotFoundException(`Producto ${id} no encontrado`)
        }

       this.courses.splice(indexCourse,1);
       return true;
    }
}
