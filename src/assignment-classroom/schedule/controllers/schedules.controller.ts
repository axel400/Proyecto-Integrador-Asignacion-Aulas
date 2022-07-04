import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateScheduleDto, UpdateScheduleDto } from 'src/assignment-classroom/schedule/dtos/schedule.dto';
import { SchedulesService } from 'src/assignment-classroom/schedule/services/schedules.service';

@Controller('schedules')
export class SchedulesController {
    
    constructor(private scheduleService: SchedulesService) {}

    //Traer todo
    @Get()
    findAll() {
      return this.scheduleService.findAll();
    }

    //Traer por id
    @Get(':id')
    find(@Param('id',ParseIntPipe) id: number) {
        return this.scheduleService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateScheduleDto) {
        return this.scheduleService.create(payload);
    }

    //Actualizar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateScheduleDto,
    ) {
        return this.scheduleService.update(id, body);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.scheduleService.remove(+id);
    }

}
