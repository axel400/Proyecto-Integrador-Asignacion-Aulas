import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from 'src/assignment-classroom/school-year/dtos/schoolYear.dto';
import { SchoolYear } from '../entities/school-year.entity';

@Injectable()
export class SchoolYearService {
  private counterId = 1;
  
  private schoolYear: SchoolYear[] = [
    {
      id: 1,
      name: 'Primero',
    },
  ];

  findAll() {
    return this.schoolYear;
  }

  findOne(id: number) {
    const level = this.schoolYear.find((item) => item.id === id);
    if (!level) {
      throw new NotFoundException(`AñoLectivo #${id} no encontrado`);
    }
    return level;
  }

  create(data: CreateSchoolYearDto) {
    this.counterId = this.counterId + 1;
    const newSchool = {
      id: this.counterId,
      ...data,
    };
    this.schoolYear.push(newSchool);
    return newSchool;
  }

  update(id: number, payload: UpdateSchoolYearDto) {
    const school = this.findOne(id);
    if (school) {
      const index = this.schoolYear.findIndex((item) => item.id === id);
      this.schoolYear[index] = {
        ...school,
        ...payload,
      };
      return this.schoolYear[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.schoolYear.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`AñoLectivo #${id} no encontrado`);
    }
    this.schoolYear.splice(index, 1);
    return true;
  }
}
