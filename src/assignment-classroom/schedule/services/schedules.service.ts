import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysService } from 'src/assignment-classroom/day/services/days.service';
import { StatusService } from 'src/assignment-classroom/status/services/status.service';
import { Repository } from 'typeorm';
import { CreateScheduleDto, UpdateScheduleDto } from '../dtos/schedule.dto';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepo: Repository<Schedule>,
        private dayService: DaysService,
        private statusService: StatusService
    ) { }

    //Traer todo
    async findAll() {
        return await this.scheduleRepo.find();
    }

    //Traer por id
    async findOne(id: number) {
        const schedule = await this.scheduleRepo.findOne({ where: { id: id } });

        if (!schedule) {
            throw new NotFoundException(`Horario #${id} no encontrado`);
        }

        return schedule;
    }

    //Crear
    async create(payload: CreateScheduleDto) {
        const newSchedule = this.scheduleRepo.create(payload);

        newSchedule.day = await this.dayService.findOne(payload.day.id);
        newSchedule.status = await this.statusService.findOne(payload.status.id);

        return await this.scheduleRepo.save(newSchedule);
    }

    //Editar
    async update(id: number, payload: UpdateScheduleDto) {
        const schedule = await this.scheduleRepo.findOne({ where: { id: id } });

        if (schedule === null) {
            throw new NotFoundException(`Horario #${id} no encontrado`);
        }

        this.scheduleRepo.merge(schedule, payload);

        return await this.scheduleRepo.save(schedule);
    }

    //Eliminar
    async remove(id: number) {
        const schedule = await this.scheduleRepo.findOne({ where: { id } });

        if (!schedule) {
            throw new NotFoundException(`Horario #${id} no encontrado`);
        }

        return await this.scheduleRepo.softDelete(id);
    }
}