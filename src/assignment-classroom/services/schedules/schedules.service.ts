import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto, UpdateScheduleDto } from 'src/assignment-classroom/dtos/schedule.dto';
import { Schedule } from 'src/assignment-classroom/entities/schedule.entity';

@Injectable()
export class SchedulesService {

    private countIdSchedule = 1;

    private schedules: Schedule[] = [{
        id: 1,
        date: "2020-06-25",
        startTime: "09:00",
        endTime: "11:00"
    }]
    /** Buscar todo */
    findAll(): Schedule[] {

        return this.schedules;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.schedules.find((item) => item.id);
    }
    /**Create */
    getId(id: number): Schedule {
        return this.schedules.find( (item: Schedule) => item.id == id);
      }

    create(payload: CreateScheduleDto) {

        this.countIdSchedule = this.countIdSchedule + 1;
        const newSchedule = {
            id: this.countIdSchedule,
            ...payload,
        };
        this.schedules.push(newSchedule);
        return newSchedule;

    }

    /**UPDATE */

  update(id: number, payload: UpdateScheduleDto) {

   const level = this.findOne(id);
    if (level) {     const index = this.schedules.findIndex((item) => item.id === id);
     this.schedules[index] = {
        ...level,         ...payload,       };
       return this.schedules[index];
     }
    return null;
 }

// update(id: number, body: any) {
//     let product: WeekdayDays = {
//       id,
//       name: body.name,
      
//     }
//     this.schedules = this.schedules.map( (item: WeekdayDays) => {
//       console.log(item, id, item.id == id);
//       return item.id == id ? product : item;
//     });
//   }
    /**DELETE  */

    delete(id: number) {
        const indexSchedule = this.schedules.findIndex((item) => item.id === id);//
        if (indexSchedule===-1){
            throw new NotFoundException(`Horario ${id} no encontrado`)
        }

       this.schedules.splice(indexSchedule,1);
       return true;
    }
}
