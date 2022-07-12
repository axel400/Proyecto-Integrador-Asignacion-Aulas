import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCareerDto, UpdateCareerDto } from 'src/assignment-classroom/career/dtos/career.dto';
import { Career } from 'src/assignment-classroom/career/entities/career.entity';
import { SchoolYearService } from 'src/assignment-classroom/school-year/services/school-year.service';
import { Repository } from 'typeorm';

@Injectable()
export class CareersService {
    constructor(
        @InjectRepository(Career)
        private careerRepo: Repository<Career>,
        private schoolYearService: SchoolYearService
    ) { }

    //Traer todo
    async findAll() {
        return await this.careerRepo.find();
    }

    //Traer por id
    async findOne(id: number) {
        const career = await this.careerRepo.findOne({ where: { id: id } });

        if (!career) {
            throw new NotFoundException(`Carrera #${id} no encontrada`);
        }

        return career;
    }

    //Crear
    async create(payload: CreateCareerDto) {
        const newCareer = this.careerRepo.create(payload);

        newCareer.schoolYear = await this.schoolYearService.findOne(payload.schoolYear.id);

        return await this.careerRepo.save(newCareer);
    }

    //Editar
    async update(id: number, payload: UpdateCareerDto) {
        const career = await this.careerRepo.findOne({ where: { id: id } });

        if (career === null) {
            throw new NotFoundException(`Carrera #${id} no encontrada`);
        }

        this.careerRepo.merge(career, payload);

        return await this.careerRepo.save(career);
    }

    //Eliminar
    async remove(id: number) {
        const career = await this.careerRepo.findOne({ where: { id } });

        if (!career) {
            throw new NotFoundException(`Carrera #${id} no encontrada`);
        }

        return await this.careerRepo.softDelete(id);
    }
}