import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateLevelDto, UpdateLevelDto } from 'src/assignment-classroom/dtos/level.dto';
import { LevelsService } from 'src/assignment-classroom/services/levels/levels.service';

@Controller('levels')
export class LevelsController {

    constructor(private levelService: LevelsService) {

    }

    /**RUTAS  NO DINAMICAS */
    @Get('filter')//@Get('products/filter')
    getLevelFilter() {
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
        return this.levelService.getId(id);
    }

    @Get('') getLevels(
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

        return this.levelService.findAll()

    }


    //crear*******************
    @Post()
    create(@Body() payload: CreateLevelDto) {
        // return {
        //     message:'accion de crear',
        //     payload,
        // }
        return this.levelService.create(payload);
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
        @Body() body: UpdateLevelDto,
    ) {
        return this.levelService.update(id, body);
    }

    /***DELETE */
    @Delete(':id')
    delete(@Param('id') id: number) {
        // return id;
        return this.levelService.delete(+id);
    }


}

