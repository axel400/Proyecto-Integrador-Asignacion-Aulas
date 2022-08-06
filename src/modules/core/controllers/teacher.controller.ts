import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateTeacherDto, UpdateTeacherDto } from '../dto/teacher/teacher.dto';
import { FilterTeacherDto } from '../dto/teacher/teacher.filter.dto';
import { TeacherEntity } from '../entities/teacher.entity';
import { TeachersService } from '../services/teachers.service';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) { }

    @ApiOperation({ summary: 'Create Teacher' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateTeacherDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teachersService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Teacher was created',
            title: 'Teacher Created',
        };
    }

    @ApiOperation({ summary: 'Find All Teachers' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterTeacherDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teachersService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all teachers',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Teacher' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teachersService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find teacher`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Teacher' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTeacherDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teachersService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Teacher was updated`,
            title: `Teacher Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Teacher' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teachersService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Teacher was deleted`,
            title: `Teacher Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Teachers' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: TeacherEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teachersService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Teachers was deleted`,
            title: `Teachers Deleted`,
        };
    }
}
