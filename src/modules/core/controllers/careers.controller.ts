import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CareersService } from '../services/careers.service';
import { CreateCareerDto, UpdateCareerDto } from '../dto/career/career.dto';
import { FilterCareerDto } from '../dto/career/career.filter.dto';
import { CareerEntity } from '../entities/career.entity';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private careersService: CareersService) { }

  @ApiOperation({ summary: 'Create Career' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Career was created',
      title: 'Career Created',
    };
  }

  @ApiOperation({ summary: 'Find All Careers' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterCareerDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all careers',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find Career' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Find career`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update Career' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCareerDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `Career was updated`,
      title: `Career Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete Career' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Career was deleted`,
      title: `Career Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All Careers' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CareerEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.careersService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Careers was deleted`,
      title: `Careers Deleted`,
    };
  }
}
