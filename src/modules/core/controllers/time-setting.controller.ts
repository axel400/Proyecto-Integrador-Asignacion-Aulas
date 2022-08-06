import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateTimeSettingDto, UpdateTimeSettingDto } from '../dto/time-setting/time-setting.dto';
import { FilterTimeSettingDto } from '../dto/time-setting/time-setting.filter.dto';
import { TimeSettingEntity } from '../entities/time-setting.entity';
import { TimeSettingsService } from '../services/time-settings.service';

@ApiTags('TimeSettings')
@Controller('time-settings')
export class TimeSettingsController {
    constructor(private timeSettingsService: TimeSettingsService) { }

    @ApiOperation({ summary: 'Create Time-settings' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateTimeSettingDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.timeSettingsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Time-settings was created',
            title: 'Time-settings Created',
        };
    }

    @ApiOperation({ summary: 'Find All TimeSettings' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterTimeSettingDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.timeSettingsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all time-settings',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Time-settings' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.timeSettingsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find time-settings`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Time-settings' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTimeSettingDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.timeSettingsService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Time-settings was updated`,
            title: `Time-settings Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Time-settings' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.timeSettingsService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Time-settings was deleted`,
            title: `Time-settings Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All TimeSettings' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: TimeSettingEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.timeSettingsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `TimeSettings was deleted`,
            title: `TimeSettings Deleted`,
        };
    }
}
