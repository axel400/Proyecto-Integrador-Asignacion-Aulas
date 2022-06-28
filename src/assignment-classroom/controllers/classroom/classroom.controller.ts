import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateClassroomDto, UpdateClassroomDto } from 'src/assignment-classroom/dtos/classroom.dto';
import { ClassroomsService } from 'src/assignment-classroom/services/classroom/classrooms.service';

@Controller('classrooms')
export class ClassroomController {

    constructor(private classroomService: ClassroomsService) {

    }

    /**RUTAS  NO DINAMICAS */
    @Get('filter')//@Get('products/filter')
    getProductFilter() {
        return `Hola Mundo `;

    }

    /**RUTAS   DINAMICAS */
    // @Get(':id')//@Get('products/:productId')
    // getProduct(@Param(`id`,ParseIntPipe) id: number) {
    //     // return `product ${productId}`;
    //     return this.classroomService.findOne(id);

    // }

    @Get(':id')
    find(@Param('id',ParseIntPipe) id: number) {
        return this.classroomService.getId(id);
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

        return this.classroomService.findAll()

    }


    //crear*******************
    @Post()
    create(@Body() payload: CreateClassroomDto) {
        // return {
        //     message:'accion de crear',
        //     payload,
        // }
        return this.classroomService.create(payload);
    }

    //************* update******************
    // @Put(':id')
    // update(@Param('id') id: number, @Body() payload: UpdateclassroomDayDto) {
    //     // return {
    //     //     id,
    //     //     payload,
    //     // }
    //     return this.classroomService.update(id, payload);
    // }
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() body: UpdateClassroomDto,
    ) {
        return this.classroomService.update(id, body);
    }

    /***DELETE */
    @Delete(':id')
    delete(@Param('id') id: number) {
        // return id;
        return this.classroomService.delete(+id);
    }


}
