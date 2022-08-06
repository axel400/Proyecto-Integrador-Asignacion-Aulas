import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { FilterDayDto } from '../dto/day/day.filter.dto';
import { CreateDayDto, UpdateDayDto } from '../dto/day/days.dto';
import { DayEntity } from '../entities/day.entity';
import { DaysService } from '../services/days.service';

@ApiTags('Days')
@Controller('days')
export class DaysController {
    constructor(private daysService: DaysService) { }

    @ApiOperation({ summary: 'Create Day' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateDayDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.daysService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Day was created',
            title: 'Day Created',
        };
    }

    @ApiOperation({ summary: 'Find All Days' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterDayDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.daysService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all days',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Day' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.daysService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find day`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Day' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateDayDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.daysService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Day was updated`,
            title: `Day Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Day' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.daysService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Day was deleted`,
            title: `Day Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Days' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: DayEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.daysService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Days was deleted`,
            title: `Days Deleted`,
        };
    }
}
