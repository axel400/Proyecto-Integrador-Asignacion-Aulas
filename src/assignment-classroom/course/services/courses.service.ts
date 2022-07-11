import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto, UpdateCourseDto } from 'src/assignment-classroom/course/dtos/course.dto';
import { Course } from 'src/assignment-classroom/course/entities/course.entity';
import { Level } from 'src/assignment-classroom/level/entities/level.entity';
import { LevelsService } from 'src/assignment-classroom/level/services/levels.service';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    private levelService: LevelsService
  ) { }

  //Traer todo
  async findAll() {
    return await this.courseRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const course = await this.courseRepo.findOne({ where: { id: id } });

    if (!course) {
      throw new NotFoundException(`Curso #${id} no encontrado`);
    }

    return course;
  }

  //Crear
  async create(payload: CreateCourseDto) {
    const newCourse = this.courseRepo.create(payload);

    newCourse.level = await this.levelService.findOne(payload.level.id);

    return await this.courseRepo.save(newCourse);
  }

  //Editar
  async update(id: number, payload: UpdateCourseDto) {
    const course = await this.courseRepo.findOne({ where: { id: id } });

    if (course === null) {
      throw new NotFoundException(`Curso #${id} no encontrado`);
    }

    this.courseRepo.merge(course, payload);

    return await this.courseRepo.save(course);
  }

  //Eliminar
  async remove(id: number) {
    const course = await this.courseRepo.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Curso #${id} no encontrado`);
    }

    return await this.courseRepo.softDelete(id);
  }

}
