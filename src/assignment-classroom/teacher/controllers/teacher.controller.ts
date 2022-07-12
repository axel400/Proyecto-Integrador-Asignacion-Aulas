import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from 'src/assignment-classroom/teacher/dtos/teacher.dto';
import { TeacherService } from '../services/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) { }

  //Traer todo
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  //Traer por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOne(id);
  }

  //Crear
  @Post()
  create(@Body() payload: CreateTeacherDto) {
    return this.teacherService.create(payload);
  }

  //Editar
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, payload);
  }

  //Eliminar
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.remove(id);
  }
}
