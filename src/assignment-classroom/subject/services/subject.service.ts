import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/assignment-classroom/course/services/courses.service';
import { JourneysService } from 'src/assignment-classroom/journey/services/journeys.service';
import { CreateSubjectDto, UpdateSubjectDto } from 'src/assignment-classroom/subject/dtos/subject.dto';
import { Subject } from 'src/assignment-classroom/subject/entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {

  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
    private journeyService: JourneysService,
    private courseService: CoursesService,
  ) { }

  //Traer todo
  async findAll() {
    return await this.subjectRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id: id } });

    if (!subject) {
      throw new NotFoundException(`Asignatura #${id} no encontrada`);
    }

    return subject;
  }

  //Crear
  async create(payload: CreateSubjectDto) {
    const newSubject = this.subjectRepo.create(payload);

    newSubject.journey = await this.journeyService.findOne(payload.journey.id);
    newSubject.course = await this.courseService.findOne(payload.course.id);

    return await this.subjectRepo.save(newSubject);
  }

  //Editar
  async update(id: number, payload: UpdateSubjectDto) {
    const subject = await this.subjectRepo.findOne({ where: { id: id } });

    subject.journey = await this.journeyService.findOne(payload.journey.id);
    subject.course = await this.courseService.findOne(payload.course.id);

    if (subject === null) {
      throw new NotFoundException(`Asignatura #${id} no encontrada`);
    }

    this.subjectRepo.merge(subject, payload);

    return await this.subjectRepo.save(subject);
  }

  //Eliminar
  async remove(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id } });

    if (!subject) {
      throw new NotFoundException(`Asignatura #${id} no encontrada`);
    }

    return await this.subjectRepo.softDelete(id);
  }

}
