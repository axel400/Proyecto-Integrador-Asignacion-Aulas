import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from 'src/assignment-classroom/course/dtos/course.dto';
import { CoursesService } from '../services/courses.service';


@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {

    }

    /**RUTAS  NO DINAMICAS */
    @Get('filter')//@Get('products/filter')
    getDayFilter() {
        return `Hola Mundo `;

    }

    /**RUTAS   DINAMICAS */
    // @Get(':id')//@Get('products/:productId')
    // getProduct(@Param(`id`,ParseIntPipe) id: number) {
    //     // return `product ${productId}`;
    //     return this.weekService.findOne(id);

    // }

    @Get(':id')
    find(@Param('id',ParseIntPipe) id: number) {
        return this.courseService.getId(id);
    }

    @Get('')//    @Get('products')
    getProducts(
        // @Query(`limit`) limit: number =10,
        @Query(`limit`) limit = 10,
        @Query(`offset`) offset = 0,
        @Query(`brand`) brand: string,) {
        // const{limit,offset}=params;){
        // return `products:=>${limit} offset=${offset}`;
        // return `products limit=>${limit} offset=${offset} brand=>${brand}`
        // return {
        //     message: `products limit=>${limit} offset=${offset} brand=>${brand}`
        // }

        return this.courseService.findAll()

    }


    //crear*******************
    @Post()
    create(@Body() payload: CreateCourseDto) {
        // return {
        //     message:'accion de crear',
        //     payload,
        // }
        return this.courseService.create(payload);
    }

    //************* update******************
    // @Put(':id')
    // update(@Param('id') id: number, @Body() payload: UpdateWeekDayDto) {
    //     // return {
    //     //     id,
    //     //     payload,
    //     // }
    //     return this.weekService.update(id, payload);
    // }
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() body: UpdateCourseDto,
    ) {
        return this.courseService.update(id, body);
    }

    /***DELETE */
    @Delete(':id')
    delete(@Param('id') id: number) {
        // return id;
        return this.courseService.delete(+id);
    }

}
