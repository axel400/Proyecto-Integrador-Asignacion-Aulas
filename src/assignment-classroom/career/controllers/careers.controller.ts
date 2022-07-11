// import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
// import { CreateCareerDto, UpdateCareerDto } from 'src/assignment-classroom/career/dtos/career.dto';
// import { CareersService } from 'src/assignment-classroom/career/services/careers.service';

// @Controller('Careers')
// export class CareersController {

//     constructor(private careerService: CareersService) {

//     }

//     /**RUTAS  NO DINAMICAS */
//     @Get('filter')//@Get('products/filter')
//     getProductFilter() {
//         return `Hola Mundo `;

//     }

//     /**RUTAS   DINAMICAS */
//     // @Get(':id')//@Get('products/:productId')
//     // getProduct(@Param(`id`,ParseIntPipe) id: number) {
//     //     // return `product ${productId}`;
//     //     return this.careerService.findOne(id);

//     // }

//     @Get(':id')
//     find(@Param('id',ParseIntPipe) id: number) {
//         return this.careerService.getId(id);
//     }

//     @Get('')//    @Get('products')
//     getProducts(
//         // @Query(`limit`) limit: number =10,
//         @Query(`limit`) limit = 10,
//         @Query(`offset`) offset = 0,
//         @Query(`brand`) brand: string,) {
//         // const{limit,offset}=params;){
//         // return `products:=>${limit} offset=${offset}`;
//         // return `products limit=>${limit} offset=${offset} brand=>${brand}`
//         // return {
//         //     message: `products limit=>${limit} offset=${offset} brand=>${brand}`
//         // }

//         return this.careerService.findAll()

//     }


//     //crear*******************
//     @Post()
//     create(@Body() payload: CreateCareerDto) {
//         // return {
//         //     message:'accion de crear',
//         //     payload,
//         // }
//         return this.careerService.create(payload);
//     }

//     //************* update******************
//     // @Put(':id')
//     // update(@Param('id') id: number, @Body() payload: UpdateCareerDto) {
//     //     // return {
//     //     //     id,
//     //     //     payload,
//     //     // }
//     //     return this.careerService.update(id, payload);
//     // }
//     @Put(':id')
//     update(
//         @Param('id') id: number,
//         @Body() body: UpdateCareerDto,
//     ) {
//         return this.careerService.update(id, body);
//     }

//     /***DELETE */
//     @Delete(':id')
//     delete(@Param('id') id: number) {
//         // return id;
//         return this.careerService.delete(+id);
//     }


// }