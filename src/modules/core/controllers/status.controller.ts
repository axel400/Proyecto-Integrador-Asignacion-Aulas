import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateStateDto, UpdateStateDto } from '../dto/state/state.dto';
import { FilterStateDto } from '../dto/state/state.filter.dto';
import { StateEntity } from '../entities/state.entity';
import { StatusService } from '../services/status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) { }

    @ApiOperation({ summary: 'Create State' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateStateDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.statusService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'State was created',
            title: 'State Created',
        };
    }

    @ApiOperation({ summary: 'Find All Status' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterStateDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.statusService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all status',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find State' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.statusService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find state`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update State' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateStateDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.statusService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `State was updated`,
            title: `State Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete State' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.statusService.remove(id);

        return {
            data: serviceResponse.data,
            message: `State was deleted`,
            title: `State Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Status' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: StateEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.statusService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Status was deleted`,
            title: `Status Deleted`,
        };
    }
}
