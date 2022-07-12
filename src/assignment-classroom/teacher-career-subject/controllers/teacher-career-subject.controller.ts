import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CreateTeacherCareerSubjectDto, UpdateTeacherCareerSubjectDto } from '../dtos/teacher-career-subject.dto';
import { TeacherCareerSubjectService } from '../services/teacher-career-subject.service';

@Controller('teacher-career-subject')
export class TeacherCareerSubjectController {
  constructor(private readonly teacherCareerSubjectService: TeacherCareerSubjectService) {}

  //Traer todo
  @Get()
  findAll() {
    return this.teacherCareerSubjectService.findAll();
  }

  //Traer por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherCareerSubjectService.findOne(id);
  }

  //Crear
  @Post()
  create(@Body() payload: CreateTeacherCareerSubjectDto) {
    return this.teacherCareerSubjectService.create(payload);
  }

  //Editar
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTeacherCareerSubjectDto) {
    return this.teacherCareerSubjectService.update(id, payload);
  }

  //Eliminar
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teacherCareerSubjectService.remove(id);
  }

}
