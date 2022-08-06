import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateLocationDto, UpdateLocationDto } from '../dto/location/location.dto';
import { FilterLocationDto } from '../dto/location/location.filter.dto';
import { LocationEntity } from '../entities/location.entity';
import { LocationsService } from '../services/locations.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) { }

    @ApiOperation({ summary: 'Create Location' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateLocationDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.locationsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Location was created',
            title: 'Location Created',
        };
    }

    @ApiOperation({ summary: 'Find All Locations' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterLocationDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.locationsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all locations',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Location' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.locationsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find location`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Location' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateLocationDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.locationsService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Location was updated`,
            title: `Location Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Location' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.locationsService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Location was deleted`,
            title: `Location Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Locations' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: LocationEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.locationsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Locations was deleted`,
            title: `Locations Deleted`,
        };
    }
}
