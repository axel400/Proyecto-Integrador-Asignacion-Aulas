import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeekDayDto, UpdateWeekDayDto } from 'src/assignment-classroom/dtos/weekdays.dto';
import { WeekdayDays } from 'src/assignment-classroom/entities/weekdays.entity';

@Injectable()
export class WeekdaysService {

    private countIdWeek = 1;

    private weekdays: WeekdayDays[] = [{
        id: 1,
        name: "Lunes"
    }]
    /** Buscar todo */
    findAll(): WeekdayDays[] {

        return this.weekdays;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.weekdays.find((item) => item.id);
    }
    /**Create */
    getId(id: number): WeekdayDays {
        return this.weekdays.find( (item: WeekdayDays) => item.id == id);
      }

    create(payload: CreateWeekDayDto) {

        this.countIdWeek = this.countIdWeek + 1;
        const newWeek = {
            id: this.countIdWeek,
            ...payload,
        };
        this.weekdays.push(newWeek);
        return newWeek;

    }

    /**UPDATE */

  update(id: number, payload: UpdateWeekDayDto) {

   const week = this.findOne(id);
    if (week) {     const index = this.weekdays.findIndex((item) => item.id === id);
     this.weekdays[index] = {
        ...week,         ...payload,       };
       return this.weekdays[index];
     }
    return null;
 }

// update(id: number, body: any) {
//     let product: WeekdayDays = {
//       id,
//       name: body.name,
      
//     }
//     this.weekdays = this.weekdays.map( (item: WeekdayDays) => {
//       console.log(item, id, item.id == id);
//       return item.id == id ? product : item;
//     });
//   }
    /**DELETE  */

    delete(id: number) {
        const indexWeek = this.weekdays.findIndex((item) => item.id === id);//
        if (indexWeek===-1){
            throw new NotFoundException(`Producto ${id} no encontrado`)
        }

       this.weekdays.splice(indexWeek,1);
       return true;
    }
}

