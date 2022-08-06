import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateHourDto, UpdateHourDto } from '../dto/hour/hour.dto';
import { FilterHourDto } from '../dto/hour/hour.filter.dto';
import { HourEntity } from '../entities/hour.entity';
import { HoursService } from '../services/hours.service';

@ApiTags('Hours')
@Controller('hours')
export class HoursController {
    constructor(private hoursService: HoursService) { }

    @ApiOperation({ summary: 'Create Hour' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateHourDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.hoursService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Hour was created',
            title: 'Hour Created',
        };
    }

    @ApiOperation({ summary: 'Find All Hours' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterHourDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.hoursService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all hours',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Hour' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.hoursService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find hour`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Hour' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateHourDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.hoursService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Hour was updated`,
            title: `Hour Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Hour' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.hoursService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Hour was deleted`,
            title: `Hour Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Hours' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: HourEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.hoursService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Hours was deleted`,
            title: `Hours Deleted`,
        };
    }
}
