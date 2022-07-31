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
import { CreateTeacherDistributionDto, UpdateTeacherDistributionDto } from '../dto/teacher-distribution/teacher-distribution.dto';
import { FilterTeacherDistributionDto } from '../dto/teacher-distribution/teacher-distribution.filter.dto';
import { TeacherDistributionEntity } from '../entities/teacher-distribution.entity';
import { TeacherDistributionsService } from '../services/teacher-distributions.service';

@ApiTags('TeacherDistributions')
@Controller('teacher-distributions')
export class TeacherDistributionsController {
    constructor(private teacherDistributionsService: TeacherDistributionsService) { }

    @ApiOperation({ summary: 'Create Teacher-distribution' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateTeacherDistributionDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teacherDistributionsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Teacher-distribution was created',
            title: 'Teacher-distribution Created',
        };
    }

    @ApiOperation({ summary: 'Find All Teacher-distributions' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterTeacherDistributionDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teacherDistributionsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all teacher-distributions',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Teacher-distribution' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teacherDistributionsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find teacher-distribution`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Teacher-distribution' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateTeacherDistributionDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teacherDistributionsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Teacher-distribution was updated`,
            title: `Teacher-distribution Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Teacher-distribution' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teacherDistributionsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Teacher-distribution was deleted`,
            title: `Teacher-distribution Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All TeacherDistributions' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: TeacherDistributionEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.teacherDistributionsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Teacher-distributions was deleted`,
            title: `Teacher-distributions Deleted`,
        };
    }
}
