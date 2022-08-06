import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateSchedulePositionDto, UpdateSchedulePositionDto } from '../dto/schedule-position/schedule-position-detail.dto';
import { FilterSchedulePositionDto } from '../dto/schedule-position/schedule-position-detail.filter.dto';
import { SchedulePositionEntity } from '../entities/schedule-position.entity';
import { SchedulePositionsService } from '../services/schedule-position.service';

@ApiTags('SchedulePositions')
@Controller('schedule-positions')
export class SchedulePositionsController {
    constructor(private schedulePositionsService: SchedulePositionsService) { }

    @ApiOperation({ summary: 'Create Schedule-position' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateSchedulePositionDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schedulePositionsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Schedule-position was created',
            title: 'Schedule-position Created',
        };
    }

    @ApiOperation({ summary: 'Find All schedule-position' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterSchedulePositionDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schedulePositionsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all schedule-positions',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find schedule-position' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schedulePositionsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find schedule-positions`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update schedule-positions' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateSchedulePositionDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schedulePositionsService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Schedule-positions was updated`,
            title: `Schedule-positions Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete schedule-position' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schedulePositionsService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Schedule-position was deleted`,
            title: `Schedule-position Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All SchedulePosition' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: SchedulePositionEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schedulePositionsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `SchedulePosition was deleted`,
            title: `SchedulePosition Deleted`,
        };
    }
}
