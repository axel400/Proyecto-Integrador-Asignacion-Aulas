import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from 'src/assignment-classroom/school-year/dtos/schoolYear.dto';
import { SchoolYearService } from '../services/school-year.service';

@Controller('school-year')
export class SchoolYearController {

    constructor(private schoolYearService: SchoolYearService) { }

    //Traer todo
    @Get()
    findAll() {
        return this.schoolYearService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.schoolYearService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateSchoolYearDto) {
        return this.schoolYearService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateSchoolYearDto,
    ) {
        return this.schoolYearService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.schoolYearService.remove(id);
    }

}
