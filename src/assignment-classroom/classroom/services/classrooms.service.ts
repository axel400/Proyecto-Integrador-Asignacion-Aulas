import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClassroomDto } from 'src/assignment-classroom/classroom/dtos/classroom.dto';
import { UpdateClassroomDto } from 'src/assignment-classroom/classroom/dtos/classroom.dto';
import { Classroom } from 'src/assignment-classroom/classroom/entities/classroom.entity';
import { StatusService } from 'src/assignment-classroom/status/services/status.service';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomsService {

  constructor(
    @InjectRepository(Classroom)
    private classroomRepo: Repository<Classroom>,
    private statusService: StatusService
  ) { }

  //Traer todo
  async findAll() {
    return await this.classroomRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const classroom = await this.classroomRepo.findOne({ where: { id: id } });

    if (!classroom) {
      throw new NotFoundException(`Aula #${id} no encontrada`);
    }

    return classroom;
  }

  //Crear
  async create(payload: CreateClassroomDto) {
    const newClassroom = this.classroomRepo.create(payload);

    newClassroom.status = await this.statusService.findOne(payload.status.id);

    return await this.classroomRepo.save(newClassroom);
  }

  //Editar
  async update(id: number, payload: UpdateClassroomDto) {
    const classroom = await this.classroomRepo.findOne({ where: { id: id } });

    classroom.status = await this.statusService.findOne(payload.status.id);

    if (classroom === null) {
      throw new NotFoundException(`Aula #${id} no encontrada`);
    }

    this.classroomRepo.merge(classroom, payload);

    return await this.classroomRepo.save(classroom);
  }

  //Eliminar
  async remove(id: number) {
    const classroom = await this.classroomRepo.findOne({ where: { id } });

    if (!classroom) {
      throw new NotFoundException(`Aula #${id} no encontrada`);
    }

    return await this.classroomRepo.softDelete(id);
  }

}

