import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, } from '@nestjs/common';
import { CreateSubjectDto, UpdateSubjectDto, } from 'src/assignment-classroom/subject/dtos/subject.dto';
import { SubjectService } from 'src/assignment-classroom/subject/services/subject.service';

@Controller('subject')
export class SubjectController {

  constructor(private subjectService: SubjectService) { }

  //Traer todo
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  //Traer por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.findOne(id);
  }

  //Crear
  @Post()
  create(@Body() payload: CreateSubjectDto) {
    return this.subjectService.create(payload);
  }

  //Editar
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateSubjectDto) {
    return this.subjectService.update(id, payload);
  }

  //Eliminar
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.remove(id);
  }

}
