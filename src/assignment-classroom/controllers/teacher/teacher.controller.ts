import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
} from 'src/assignment-classroom/dtos/teacher.dto';
import { TeacherService } from 'src/assignment-classroom/services/teacher/teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  /**RUTAS  NO DINAMICAS */
  @Get('filter') //@Get('products/filter')
  getProductFilter() {
    return `Hola Mundo `;
  }

  /**RUTAS   DINAMICAS */
  // @Get(':id')//@Get('products/:productId')
  // getProduct(@Param(`id`,ParseIntPipe) id: number) {
  //     // return `product ${productId}`;
  //     return this.teacherService.findOne(id);

  // }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getId(id);
  }

  @Get('') //    @Get('products')
  getProducts(
    // @Query(`limit`) limit: number =10,
    @Query(`limit`) limit = 10,
    @Query(`offset`) offset = 0,
    @Query(`brand`) brand: number,
  ) {
    // const{limit,offset}=params;){
    // return `products:=>${limit} offset=${offset}`;
    // return `products limit=>${limit} offset=${offset} brand=>${brand}`
    // return {
    //     message: `products limit=>${limit} offset=${offset} brand=>${brand}`
    // }

    return this.teacherService.findAll();
  }

  //crear*******************
  @Post()
  create(@Body() payload: CreateTeacherDto) {
    // return {
    //     message:'accion de crear',
    //     payload,
    // }
    return this.teacherService.create(payload);
  }

  //************* update******************
  // @Put(':id')
  // update(@Param('id') id: number, @Body() payload: UpdateTeacherDto) {
  //     // return {
  //     //     id,
  //     //     payload,
  //     // }
  //     return this.teacherService.update(id, payload);
  // }
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateTeacherDto) {
    return this.teacherService.update(id, body);
  }

  /***DELETE */
  @Delete(':id')
  delete(@Param('id') id: number) {
    // return id;
    return this.teacherService.delete(+id);
  }
}
