import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from 'src/assignment-classroom/dtos/schoolYear.dto';
import { SchoolYearService } from 'src/assignment-classroom/services/school-year/school-year.service';

@Controller('school-year')
export class SchoolYearController {

    constructor(private schoolYearService: SchoolYearService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    findAll(@Query() params: any){
        const response = this.schoolYearService.findAll();
        return response;
            //data: response,
            //message: 'index'
        //};
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: number) {
      const response = this.schoolYearService.findOne(id);
  
      return  response;
    //   {
    //     data: response,
    //     message: `show`,
    //   };
   }

   @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload:CreateSchoolYearDto) {
    const response = this.schoolYearService.create(payload);
  return response;
  
    //   return {
  //     data: response,
  //     message: `created`,
  //   };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSchoolYearDto,
  ) {
    const response = this.schoolYearService.update(id, payload);
    return response;
    // return {
    //   data: response,
    //   message: updated ${id},
    // };
  }


  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.schoolYearService.delete(id);
     
    return response;
    // return {
    //   data: response,
    //   message: `deleted`,
    // };
  }
}
