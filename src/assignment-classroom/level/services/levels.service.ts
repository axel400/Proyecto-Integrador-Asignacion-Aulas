import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelDto, UpdateLevelDto } from 'src/assignment-classroom/level/dtos/level.dto';
import { Level } from 'src/assignment-classroom/level/entities/level.entity';

@Injectable()
export class LevelsService {

  private counterId = 1;
  
  private levels: Level[] = [
    {
      id: 1,
      name: 'Primero',
    },
  ];

  findAll() {
    return this.levels;
  }

  findOne(id: number) {
    const level = this.levels.find((item) => item.id === id);
    if (!level) {
      throw new NotFoundException(`Nivel #${id} no encontrado`);
    }
    return level;
  }

  create(data: CreateLevelDto) {
    this.counterId = this.counterId + 1;
    const newLevel = {
      id: this.counterId,
      ...data,
    };
    this.levels.push(newLevel);
    return newLevel;
  }

  update(id: number, payload: UpdateLevelDto) {
    const level = this.findOne(id);
    if (level) {
      const index = this.levels.findIndex((item) => item.id === id);
      this.levels[index] = {
        ...level,
        ...payload,
      };
      return this.levels[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.levels.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Nivel #${id} no encontrado`);
    }
    this.levels.splice(index, 1);
    return true;
  }
}