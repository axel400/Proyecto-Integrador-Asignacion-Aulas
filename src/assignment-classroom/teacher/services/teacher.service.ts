import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
} from 'src/assignment-classroom/teacher/dtos/teacher.dto';
import { Teacher } from 'src/assignment-classroom/teacher/entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  private countIdTeacher = 1;

  constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) { }

  //Traer todo
  async findAll() {
    return await this.teacherRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const docente = await this.teacherRepo.findOne({ where: { id } });

    if (!docente) {
      throw new NotFoundException(`Docente #${id} no encontrado`);
    }

    return docente;
  }

  //Crear
  async create(payload: CreateTeacherDto) {
    const newTeacher = this.teacherRepo.create(payload);

    return await this.teacherRepo.save(newTeacher);
  }

  //Editar
  async update(id: number, payload: UpdateTeacherDto) {
    const docente = await this.teacherRepo.findOne({ where: { id } });

    if (!docente) {
      throw new NotFoundException(`Docente #${id} no encontrado`);
    }

    await this.teacherRepo.merge(docente, payload);

    return await this.teacherRepo.save(docente);
  }

  //Eliminar
  async remove(id: number) {
    const docente = await this.teacherRepo.findOne({ where: { id } });

    if (!docente) {
      throw new NotFoundException(`Docente #${id} no encontrado`);
    }

    return await this.teacherRepo.softDelete(id);
  }

}
