import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CreateGeneralScheduleDto, UpdateGeneralScheduleDto } from '../dtos/general-schedule.dto';
import { GeneralScheduleService } from '../services/general-schedule.service';

@Controller('general-schedule')
export class GeneralScheduleController {
  constructor(private readonly generalScheduleService: GeneralScheduleService) { }

  //Traer todo
  @Get()
  findAll() {
    return this.generalScheduleService.findAll();
  }

  //Traer por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.generalScheduleService.findOne(id);
  }

  //Crear
  @Post()
  create(@Body() payload: CreateGeneralScheduleDto) {
    return this.generalScheduleService.create(payload);
  }

  //Editar
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateGeneralScheduleDto) {
    return this.generalScheduleService.update(id, payload);
  }

  //Eliminar
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.generalScheduleService.remove(id);
  }

}
