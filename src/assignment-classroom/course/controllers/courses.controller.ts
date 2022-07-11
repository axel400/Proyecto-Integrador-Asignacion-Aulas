import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from 'src/assignment-classroom/course/dtos/course.dto';
import { CoursesService } from '../services/courses.service';


@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {
    }

    //Traer todo
    @Get()
    findAll() {
        return this.courseService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateCourseDto) {
        return this.courseService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCourseDto) {
        return this.courseService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.remove(id);
    }

}
