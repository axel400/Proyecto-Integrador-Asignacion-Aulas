import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateClassroomDto, UpdateClassroomDto } from 'src/assignment-classroom/classroom/dtos/classroom.dto';
import { ClassroomsService } from '../services/classrooms.service';

@Controller('classrooms')
export class ClassroomController {

    constructor(private classroomService: ClassroomsService) { }

    //Traer todo
    @Get()
    findAll() {
        return this.classroomService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.classroomService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateClassroomDto) {
        return this.classroomService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateClassroomDto) {
        return this.classroomService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.classroomService.remove(id);
    }

}
