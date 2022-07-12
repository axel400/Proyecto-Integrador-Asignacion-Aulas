import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateCareerDto, UpdateCareerDto } from 'src/assignment-classroom/career/dtos/career.dto';
import { CareersService } from '../services/careers.service';

@Controller('careers')
export class CareersController {

    constructor(private careerService: CareersService) {
    }

    @Get()
    findAll() {
        return this.careerService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.careerService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateCareerDto) {
        return this.careerService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCareerDto) {
        return this.careerService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.careerService.remove(id);
    }

}