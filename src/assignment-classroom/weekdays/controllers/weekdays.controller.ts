import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateWeekDayDto, UpdateWeekDayDto } from 'src/assignment-classroom/weekdays/dtos/weekdays.dto';
import { WeekdaysService } from 'src/assignment-classroom/weekdays/services/weekdays.service';

@Controller('weekdays')
export class WeekdaysController {

    constructor(private weekService: WeekdaysService) {

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
    //     return this.weekService.findOne(id);

    // }

    @Get(':id')
    find(@Param('id',ParseIntPipe) id: number) {
        return this.weekService.getId(id);
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

        return this.weekService.findAll()

    }


    //crear*******************
    @Post()
    create(@Body() payload: CreateWeekDayDto) {
        // return {
        //     message:'accion de crear',
        //     payload,
        // }
        return this.weekService.create(payload);
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
        @Body() body: UpdateWeekDayDto,
    ) {
        return this.weekService.update(id, body);
    }

    /***DELETE */
    @Delete(':id')
    delete(@Param('id') id: number) {
        // return id;
        return this.weekService.delete(+id);
    }


}
