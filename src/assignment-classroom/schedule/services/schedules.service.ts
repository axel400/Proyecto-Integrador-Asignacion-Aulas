import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto, UpdateScheduleDto } from 'src/assignment-classroom/schedule/dtos/schedule.dto';
import { Schedule } from 'src/assignment-classroom/schedule/entities/schedule.entity';

@Injectable()
export class SchedulesService {

  private counterId = 1;
  
  private schedules: Schedule[] = [
    {
      id: 1,
      date: '2020/01/02',
      startTime: '10:00',
      endTime: '12:00',
    },
  ];

  findAll() {
    return this.schedules;
  }

  findOne(id: number) {
    const schedule = this.schedules.find((item) => item.id === id);
    if (!schedule) {
      throw new NotFoundException(`Horario #${id} no encontrado`);
    }
    return schedule;
  }

  create(data: CreateScheduleDto) {
    this.counterId = this.counterId + 1;
    const newLevel = {
      id: this.counterId,
      ...data,
    };
    this.schedules.push(newLevel);
    return newLevel;
  }

  update(id: number, payload: UpdateScheduleDto) {
    const schedule = this.findOne(id);
    if (schedule) {
      const index = this.schedules.findIndex((item) => item.id === id);
      this.schedules[index] = {
        ...schedule,
        ...payload,
      };
      return this.schedules[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.schedules.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Horario #${id} no encontrado`);
    }
    this.schedules.splice(index, 1);
    return true;
  }
}