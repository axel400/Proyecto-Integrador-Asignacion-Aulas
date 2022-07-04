import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateLevelDto, UpdateLevelDto } from 'src/assignment-classroom/level/dtos/level.dto';
import { LevelsService } from '../services/levels.service';

@Controller('levels')
export class LevelsController {

    constructor(private levelService: LevelsService) {}

    //Traer todo
    @Get()
    findAll() {
      return this.levelService.findAll();
    }

    //Traer por id
    @Get(':id')
    find(@Param('id',ParseIntPipe) id: number) {
        return this.levelService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload: CreateLevelDto) {
        return this.levelService.create(payload);
    }

    //Actualizar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateLevelDto,
    ) {
        return this.levelService.update(id, body);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.levelService.remove(+id);
    }

}

