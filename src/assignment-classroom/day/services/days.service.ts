import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDayDto, UpdateDayDto } from 'src/assignment-classroom/day/dtos/days.dto';
import { Day } from 'src/assignment-classroom/day/entities/day.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysService {

    constructor(
        @InjectRepository(Day) private dayRepo: Repository<Day>,
    ) { }

    //Traer todo
    async findAll() {
        return await this.dayRepo.find();
    }

    //Traer por id
    async findOne(id: number) {
        const day = await this.dayRepo.findOne({ where: { id } });

        if (!day) {
            throw new NotFoundException(`Día #${id} no encontrado`);
        }

        return day;
    }

    //Crear
    async create(payload: CreateDayDto) {
        const newDay = this.dayRepo.create(payload);

        return await this.dayRepo.save(newDay);
    }

    //Editar
    async update(id: number, payload: UpdateDayDto) {
        const day = await this.dayRepo.findOne({ where: { id } });

        if (!day) {
            throw new NotFoundException(`Día #${id} no encontrado`);
        }

        await this.dayRepo.merge(day, payload);

        return await this.dayRepo.save(day);
    }

    //Eliminar
    async remove(id: number) {
        const day = await this.dayRepo.findOne({ where: { id } });

        if (!day) {
            throw new NotFoundException(`Día #${id} no encontrado`);
        }

        return await this.dayRepo.softDelete(id);
    }
}
