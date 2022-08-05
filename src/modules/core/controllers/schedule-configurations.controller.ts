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
import { CreateScheduleConfigurationDto, UpdateScheduleConfigurationDto } from '../dto/schedule-configuration/schedule-configuration-detail.dto';
import { FilterScheduleConfigurationDto } from '../dto/schedule-configuration/schedule-configuration-detail.filter.dto';
import { ScheduleConfigurationEntity } from '../entities/schedule-configuration.entity';
import { ScheduleConfigurationsService } from '../services/schedule-configurations.service';

@ApiTags('ScheduleConfiguration')
@Controller('schedule-configurations')
export class ScheduleConfigurationsController {
    constructor(private scheduleConfigurationsService: ScheduleConfigurationsService) { }

    @ApiOperation({ summary: 'Create Schedule-configuration' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateScheduleConfigurationDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.scheduleConfigurationsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Schedule-configuration was created',
            title: 'Schedule-configuration Created',
        };
    }

    @ApiOperation({ summary: 'Find All schedule-configuration' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterScheduleConfigurationDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.scheduleConfigurationsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all schedule-configurations',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find schedule-configuration' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.scheduleConfigurationsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find schedule-configuration`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update schedule-configuration' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateScheduleConfigurationDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.scheduleConfigurationsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Schedule-configuration was updated`,
            title: `Schedule-configuration Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete schedule-configuration' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.scheduleConfigurationsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Schedule-configuration was deleted`,
            title: `Schedule-configuration Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All ScheduleConfiguration' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ScheduleConfigurationEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.scheduleConfigurationsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `ScheduleConfiguration was deleted`,
            title: `ScheduleConfiguration Deleted`,
        };
    }
}
