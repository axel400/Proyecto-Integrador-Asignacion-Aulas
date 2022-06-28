import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelDto, UpdateLevelDto } from 'src/assignment-classroom/dtos/level.dto';
import { Level } from 'src/assignment-classroom/entities/level.entity';

@Injectable()
export class LevelsService {

    private countIdLevel = 1;

    private levels: Level[] = [{
        id: 1,
        name: "Primero",
    }]
    /** Buscar todo */
    findAll(): Level[] {

        return this.levels;
    }

    /**Buscar por id */

    findOne(id: number) {

        return this.levels.find((item) => item.id);
    }
    /**Create */
    getId(id: number): Level {
        return this.levels.find( (item: Level) => item.id == id);
      }

    create(payload: CreateLevelDto) {

        this.countIdLevel = this.countIdLevel + 1;
        const newLevel = {
            id: this.countIdLevel,
            ...payload,
        };
        this.levels.push(newLevel);
        return newLevel;

    }

    /**UPDATE */

  update(id: number, payload: UpdateLevelDto) {

   const level = this.findOne(id);
    if (level) {     const index = this.levels.findIndex((item) => item.id === id);
     this.levels[index] = {
        ...level,         ...payload,       };
       return this.levels[index];
     }
    return null;
 }

// update(id: number, body: any) {
//     let product: WeekdayDays = {
//       id,
//       name: body.name,
      
//     }
//     this.levels = this.levels.map( (item: WeekdayDays) => {
//       console.log(item, id, item.id == id);
//       return item.id == id ? product : item;
//     });
//   }
    /**DELETE  */

    delete(id: number) {
        const indexLevel = this.levels.findIndex((item) => item.id === id);//
        if (indexLevel===-1){
            throw new NotFoundException(`Nivel ${id} no encontrado`)
        }

       this.levels.splice(indexLevel,1);
       return true;
    }
}

