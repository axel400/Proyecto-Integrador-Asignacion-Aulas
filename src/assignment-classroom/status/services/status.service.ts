import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStatusDto, UpdateStatusDto } from 'src/assignment-classroom/status/dtos/status.dto';
import { Status } from 'src/assignment-classroom/status/entities/status.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StatusService {

    constructor(
        @InjectRepository(Status) private statusRepo: Repository<Status>,
    ) { }

    //Traer todo
    async findAll() {
        return await this.statusRepo.find();
    }

    //Traer por id
    async findOne(id: number) {
        const status = await this.statusRepo.findOne({ where: { id } });

        if (!status) {
            throw new NotFoundException(`Estado #${id} no encontrado`);
        }

        return status;
    }

    //Crear
    async create(payload: CreateStatusDto) {
        const newStatus = this.statusRepo.create(payload);

        return await this.statusRepo.save(newStatus);
    }

    //Editar
    async update(id: number, payload: UpdateStatusDto) {
        const status = await this.statusRepo.findOne({ where: { id } });

        if (!status) {
            throw new NotFoundException(`Estado #${id} no encontrado`);
        }

        await this.statusRepo.merge(status, payload);

        return await this.statusRepo.save(status);
    }

    //Eliminar
    async remove(id: number) {
        const status = await this.statusRepo.findOne({ where: { id } });

        if (!status) {
            throw new NotFoundException(`Estado #${id} no encontrado`);
        }

        return await this.statusRepo.softDelete(id);
    }
}
