import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateParallelDto, UpdateParallelDto } from '../dto/parallel/parallel.dto';
import { FilterParallelDto } from '../dto/parallel/parallel.filter.dto';
import { ParallelEntity } from '../entities/parallel.entity';
import { ParallelsService } from '../services/parallels.service';

@ApiTags('Parallels')
@Controller('parallels')
export class ParallelsController {
    constructor(private parallelsService: ParallelsService) { }

    @ApiOperation({ summary: 'Create Parallel' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateParallelDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.parallelsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Parallel was created',
            title: 'Parallel Created',
        };
    }

    @ApiOperation({ summary: 'Find All Parallel' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterParallelDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.parallelsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all parallel',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Parallel' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.parallelsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find parallel`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Parallel' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateParallelDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.parallelsService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Parallel was updated`,
            title: `Parallel Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Parallel' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.parallelsService.remove(id);
        
        return {
            data: serviceResponse.data,
            message: `Parallel was deleted`,
            title: `Parallel Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Parallel' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ParallelEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.parallelsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Parallel was deleted`,
            title: `Parallel Deleted`,
        };
    }
}
