import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from 'src/assignment-classroom/school-year/dtos/schoolYear.dto';
import { Repository } from 'typeorm';
import { SchoolYear } from '../entities/school-year.entity';

@Injectable()
export class SchoolYearService {

    constructor(
        @InjectRepository(SchoolYear) private schoolYearRepo: Repository<SchoolYear>,
      ) { }
      
    async findAll() {
        return await this.schoolYearRepo.find();
      }
    
      //Traer por id
      async findOne(id: number) {
        const schoolYear = await this.schoolYearRepo.findOne({ where: { id } });
    
        if (!schoolYear) {
          throw new NotFoundException(`Año lectivo #${id} no encontrado`);
        }
    
        return schoolYear;
      }
    
      //Crear
      async create(payload: CreateSchoolYearDto) {
        const newSchoolYear = this.schoolYearRepo.create(payload);
    
        return await this.schoolYearRepo.save(newSchoolYear);
      }
    
      //Editar
      async update(id: number, payload: UpdateSchoolYearDto) {
        const schoolYear = await this.schoolYearRepo.findOne({ where: { id } });
    
        if (!schoolYear) {
          throw new NotFoundException(`Año lectivo #${id} no encontrado`);
        }
    
        await this.schoolYearRepo.merge(schoolYear, payload);
    
        return await this.schoolYearRepo.save(schoolYear);
      }
    
      //Eliminar
      async remove(id: number) {
        const schoolYear = await this.schoolYearRepo.findOne({ where: { id } });
    
        if (!schoolYear) {
          throw new NotFoundException(`Año lectivo #${id} no encontrado`);
        }
    
        return await this.schoolYearRepo.softDelete(id);
      }
}
