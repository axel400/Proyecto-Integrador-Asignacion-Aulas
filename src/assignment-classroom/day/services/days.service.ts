import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDayDto, UpdateDayDto } from 'src/assignment-classroom/day/dtos/days.dto';
import { Day } from 'src/assignment-classroom/day/entities/day.entity';

@Injectable()
export class DaysService {
    private countIdDay = 1;

    private days: Day[] = [{
        id: 1,
        name: "Lunes"
    }]
    /** Buscar todo */
    findAll(): Day[] {
        return this.days;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.days.find((item) => item.id);
    }
    /**Create */
    getId(id: number): Day {
        return this.days.find( (item: Day) => item.id == id);
      }

    create(payload: CreateDayDto) {

        this.countIdDay = this.countIdDay + 1;
        const newDay = {
            id: this.countIdDay,
            ...payload,
        };
        this.days.push(newDay);
        return newDay;

    }

    /**UPDATE */

  update(id: number, payload: UpdateDayDto) {

   const day = this.findOne(id);
    if (day) {     
        const index = this.days.findIndex((item) => item.id === id);
        this.days[index] = {
        ...day,         
        ...payload,       
    };
       return this.days[index];
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
        const indexDay = this.days.findIndex((item) => item.id === id);//
        if (indexDay===-1){
            throw new NotFoundException(`Producto ${id} no encontrado`)
        }

       this.days.splice(indexDay,1);
       return true;
    }
}
