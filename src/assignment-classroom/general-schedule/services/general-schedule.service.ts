import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomsService } from 'src/assignment-classroom/classroom/services/classrooms.service';
import { SchedulesService } from 'src/assignment-classroom/schedule/services/schedules.service';
import { Repository } from 'typeorm';
import { CreateGeneralScheduleDto, UpdateGeneralScheduleDto } from '../dtos/general-schedule.dto';
import { GeneralSchedule } from '../entities/general-schedule.entity';

@Injectable()
export class GeneralScheduleService {

  constructor(
    @InjectRepository(GeneralSchedule)
    private gneralScheduleRepo: Repository<GeneralSchedule>,
    private classroomService: ClassroomsService,
    private scheduleService: SchedulesService
  ) { }

  //Traer todo
  async findAll() {
    return await this.gneralScheduleRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const generalSchedule = await this.gneralScheduleRepo.findOne({ where: { id: id } });

    if (!generalSchedule) {
      throw new NotFoundException(`Horario general #${id} no encontrado`);
    }

    return generalSchedule;
  }

  //Crear
  async create(payload: CreateGeneralScheduleDto) {
    const newGeneralSchedule = this.gneralScheduleRepo.create(payload);

    newGeneralSchedule.classroom = await this.classroomService.findOne(payload.classroom.id);
    newGeneralSchedule.schedule = await this.scheduleService.findOne(payload.schedule.id);

    return await this.gneralScheduleRepo.save(newGeneralSchedule);
  }

  //Editar
  async update(id: number, payload: UpdateGeneralScheduleDto) {
    const generalSchedule = await this.gneralScheduleRepo.findOne({ where: { id: id } });

    if (generalSchedule === null) {
      throw new NotFoundException(`Horario general #${id} no encontrado`);
    }

    this.gneralScheduleRepo.merge(generalSchedule, payload);

    return await this.gneralScheduleRepo.save(generalSchedule);
  }

  //Eliminar
  async remove(id: number) {
    const generalSchedule = await this.gneralScheduleRepo.findOne({ where: { id } });

    if (!generalSchedule) {
      throw new NotFoundException(`Horario general #${id} no encontrado`);
    }

    return await this.gneralScheduleRepo.softDelete(id);
  }

}
