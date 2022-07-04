import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateStatusDto, UpdateStatusDto } from 'src/assignment-classroom/status/dtos/status.dto';
import { StatusService } from '../services/status.service';

@Controller('status')
export class StatusController {
    
    constructor(private statusService: StatusService) {}

    //Traer todo
    @Get()
    findAll() {
      return this.statusService.findAll();
    }

    //Traer por id
    @Get(':id')
    find(@Param('id',ParseIntPipe) id: number) {
        return this.statusService.findOne(id);
    }

    //Crear
    @Post()
    create(@Body() payload:  CreateStatusDto) {
        return this.statusService.create(payload);
    }

    //Actualizar
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateStatusDto,
    ) {
        return this.statusService.update(id, body);
    }

    //Eliminar
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.statusService.remove(+id);
    }

}
