import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateScheduleDto, UpdateScheduleDto } from 'src/assignment-classroom/schedule/dtos/schedule.dto';
import { SchedulesService } from '../services/schedules.service';

@Controller('schedules')
export class SchedulesController {

    constructor(private scheduleService: SchedulesService) { }

    //Traer todo
    @Get()
    findAll() {
        return this.scheduleService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.scheduleService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateScheduleDto) {
        return this.scheduleService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateScheduleDto) {
        return this.scheduleService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.scheduleService.remove(id);
    }

}
