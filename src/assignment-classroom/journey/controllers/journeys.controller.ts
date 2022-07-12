import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateJourneyDto, UpdateJourneyDto } from '../dtos/journey.dto';
import { JourneysService } from '../services/journeys.service';

@Controller('journeys')
export class JourneysController {

    constructor(private journeyService: JourneysService) { }

    //Traer todo
    @Get()
    findAll() {
        return this.journeyService.findAll();
    }

    //Traer por id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.journeyService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateJourneyDto) {
        return this.journeyService.create(payload);
    }

    //Editar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateJourneyDto,
    ) {
        return this.journeyService.update(id, payload);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.journeyService.remove(id);
    }

}

