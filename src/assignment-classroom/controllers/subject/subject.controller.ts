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
  CreateSubjectDto,
  UpdateSubjectDto,
} from 'src/assignment-classroom/dtos/subject.dto';
import { SubjectService } from 'src/assignment-classroom/services/subject/subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  /**RUTAS  NO DINAMICAS */
  @Get('filter') //@Get('products/filter')
  getProductFilter() {
    return `Hola Mundo `;
  }

  /**RUTAS   DINAMICAS */
  // @Get(':id')//@Get('products/:productId')
  // getProduct(@Param(`id`,ParseIntPipe) id: number) {
  //     // return `product ${productId}`;
  //     return this.subjectService.findOne(id);

  // }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.getId(id);
  }

  @Get('') //    @Get('products')
  getProducts(
    // @Query(`limit`) limit: number =10,
    @Query(`limit`) limit = 10,
    @Query(`offset`) offset = 0,
    @Query(`brand`) brand: string,
  ) {
    // const{limit,offset}=params;){
    // return `products:=>${limit} offset=${offset}`;
    // return `products limit=>${limit} offset=${offset} brand=>${brand}`
    // return {
    //     message: `products limit=>${limit} offset=${offset} brand=>${brand}`
    // }

    return this.subjectService.findAll();
  }

  //crear*******************
  @Post()
  create(@Body() payload: CreateSubjectDto) {
    // return {
    //     message:'accion de crear',
    //     payload,
    // }
    return this.subjectService.create(payload);
  }

  //************* update******************
  // @Put(':id')
  // update(@Param('id') id: number, @Body() payload: UpdateWeekDayDto) {
  //     // return {
  //     //     id,
  //     //     payload,
  //     // }
  //     return this.subjectService.update(id, payload);
  // }
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateSubjectDto) {
    return this.subjectService.update(id, body);
  }

  /***DELETE */
  @Delete(':id')
  delete(@Param('id') id: number) {
    // return id;
    return this.subjectService.delete(+id);
  }
}
