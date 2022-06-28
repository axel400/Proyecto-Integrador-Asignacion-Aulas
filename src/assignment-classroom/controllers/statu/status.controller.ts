import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateStatusDto, UpdateStatusDto } from 'src/assignment-classroom/dtos/status.dto';
import { StatusService } from 'src/assignment-classroom/services/statu/status.service';

@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    findAll(@Query() params: any){
        const response = this.statusService.findAll();
        return response;
            //data: response,
            //message: 'index'
        //};
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: number) {
      const response = this.statusService.findOne(id);
  
      return  response;
    //   {
    //     data: response,
    //     message: `show`,
    //   };
   }

   @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload:CreateStatusDto) {
    const response = this.statusService.create(payload);
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
    @Body() payload: UpdateStatusDto,
  ) {
    const response = this.statusService.update(id, payload);
    return response;
    // return {
    //   data: response,
    //   message: updated ${id},
    // };
  }


  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.statusService.delete(id);
     
    return response;
    // return {
    //   data: response,
    //   message: `deleted`,
    // };
  }
}
