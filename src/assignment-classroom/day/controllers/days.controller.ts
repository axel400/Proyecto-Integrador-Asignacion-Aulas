import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateDayDto, UpdateDayDto } from '../dtos/days.dto';
import { DaysService } from '../services/days.service';

@Controller('days')
export class DaysController {
    constructor(private dayService: DaysService) { }

    //Traer todo
    @Get()
    findAll() {
        return this.dayService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.dayService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateDayDto) {
        return this.dayService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateDayDto,
    ) {
        return this.dayService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.dayService.remove(id);
    }
}
