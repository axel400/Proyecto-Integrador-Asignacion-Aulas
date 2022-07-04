import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCareerDto, UpdateCareerDto } from 'src/assignment-classroom/career/dtos/career.dto';
import { Career } from 'src/assignment-classroom/career/entities/career.entity';

@Injectable()
export class CareersService {

    private countIdCareer = 1;

    private careers: Career[] = [{
        id: 1,
        name: "Desarrollo de software"
    }]
    /** Buscar todo */
    findAll(): Career[] {

        return this.careers;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.careers.find((item) => item.id);
    }
    /**Create */
    getId(id: number): Career {
        return this.careers.find( (item: Career) => item.id == id);
      }

    create(payload: CreateCareerDto) {

        this.countIdCareer = this.countIdCareer + 1;
        const newCareer = {
            id: this.countIdCareer,
            ...payload,
        };
        this.careers.push(newCareer);
        return newCareer;

    }

    /**UPDATE */

  update(id: number, payload: UpdateCareerDto) {

   const career = this.findOne(id);
    if (career) {     const index = this.careers.findIndex((item) => item.id === id);
     this.careers[index] = {
        ...career,         ...payload,       };
       return this.careers[index];
     }
    return null;
 }

// update(id: number, body: any) {
//     let product: Careers = {
//       id,
//       name: body.name,
      
//     }
//     this.careerdays = this.careerdays.map( (item: Careers) => {
//       console.log(item, id, item.id == id);
//       return item.id == id ? product : item;
//     });
//   }
    /**DELETE  */

    delete(id: number) {
        const indexcareer = this.careers.findIndex((item) => item.id === id);//
        if (indexcareer===-1){
            throw new NotFoundException(`Carrera ${id} no encontrado`)
        }

       this.careers.splice(indexcareer,1);
       return true;
    }
}