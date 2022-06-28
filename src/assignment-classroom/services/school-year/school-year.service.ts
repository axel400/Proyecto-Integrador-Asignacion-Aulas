import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from 'src/assignment-classroom/dtos/schoolYear.dto';
import { SchoolYear } from 'src/assignment-classroom/entities/schoolYear.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolYearService {
    constructor(
        @InjectRepository(SchoolYear)
        private schoolYearRepository: Repository<SchoolYear>,
      ) {}
    
      async create(payload: CreateSchoolYearDto) {
        const newSchoolYear = this.schoolYearRepository.create(payload);
    
        return await this.schoolYearRepository.save(newSchoolYear);
      }
    
      async delete(id: number) {
        return await this.schoolYearRepository.softDelete(id);
      }
    
      async findAll() {
        return await this.schoolYearRepository.find();
      }
    
      async findOne(id: number) {
        const schoolYear = await this.schoolYearRepository.findOne({
          where: {
            id: id,
          },
        });
    
        if (schoolYear === null) {
          throw new NotFoundException('El año lectivo no se encontro');
        }
    
        return schoolYear;
      }
    
      async update(id: number, payload: UpdateSchoolYearDto) {
        const schoolYear = await this.schoolYearRepository.findOne({
          where: {
            id: id,
          },
        });
    
        if (schoolYear === null) {
          throw new NotFoundException('El año lectivo no se encontro');
        }
    
        this.schoolYearRepository.merge(schoolYear, payload);
    
        return this.schoolYearRepository.save(schoolYear);
      }
}
