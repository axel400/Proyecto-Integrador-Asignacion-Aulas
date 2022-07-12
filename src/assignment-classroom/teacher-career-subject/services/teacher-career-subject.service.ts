import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareersService } from 'src/assignment-classroom/career/services/careers.service';
import { SubjectService } from 'src/assignment-classroom/subject/services/subject.service';
import { TeacherService } from 'src/assignment-classroom/teacher/services/teacher.service';
import { Repository } from 'typeorm';
import { CreateTeacherCareerSubjectDto, UpdateTeacherCareerSubjectDto } from '../dtos/teacher-career-subject.dto';
import { TeacherCareerSubject } from '../entities/teacher-career-subject.entity';


@Injectable()
export class TeacherCareerSubjectService {
  constructor(
    @InjectRepository(TeacherCareerSubject)
    private teacherCareerSubjectRepo: Repository<TeacherCareerSubject>,
    private teacherService: TeacherService,
    private careerService: CareersService,
    private subjectService: SubjectService,
  ) { }

  //Traer todo
  async findAll() {
    return await this.teacherCareerSubjectRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const teacherCareerSubject = await this.teacherCareerSubjectRepo.findOne({ where: { id: id } });

    if (!teacherCareerSubject) {
      throw new NotFoundException(`Tabla #${id} no encontrada`);
    }

    return teacherCareerSubject;
  }

  //Crear
  async create(payload: CreateTeacherCareerSubjectDto) {
    const newTeacherCareerSubject = this.teacherCareerSubjectRepo.create(payload);

    newTeacherCareerSubject.teacher = await this.teacherService.findOne(payload.teacher.id);
    newTeacherCareerSubject.career = await this.careerService.findOne(payload.career.id);
    newTeacherCareerSubject.subject = await this.subjectService.findOne(payload.subject.id);

    return await this.teacherCareerSubjectRepo.save(newTeacherCareerSubject);
  }

  //Editar
  async update(id: number, payload: UpdateTeacherCareerSubjectDto) {
    const teacherCareerSubject = await this.teacherCareerSubjectRepo.findOne({ where: { id: id } });

    teacherCareerSubject.teacher = await this.teacherService.findOne(payload.teacher.id);
    teacherCareerSubject.career = await this.careerService.findOne(payload.career.id);
    teacherCareerSubject.subject = await this.subjectService.findOne(payload.subject.id);

    if (teacherCareerSubject === null) {
      throw new NotFoundException(`Tabla #${id} no encontrada`);
    }

    this.teacherCareerSubjectRepo.merge(teacherCareerSubject, payload);

    return await this.teacherCareerSubjectRepo.save(teacherCareerSubject);
  }

  //Eliminar
  async remove(id: number) {
    const teacherCareerSubject = await this.teacherCareerSubjectRepo.findOne({ where: { id } });

    if (!teacherCareerSubject) {
      throw new NotFoundException(`Tabla #${id} no encontrada`);
    }

    return await this.teacherCareerSubjectRepo.softDelete(id);
  }
}
