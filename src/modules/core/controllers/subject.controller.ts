import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateSubjectDto, UpdateSubjectDto } from '../dto/subject/subject.dto';
import { FilterSubjectDto } from '../dto/subject/subject.filter.dto';
import { SubjectEntity } from '../entities/subject.entity';
import { SubjectsService } from '../services/subjects.service';

@ApiTags('Subjects')
@Controller('subjects')
export class subjectsController {
    constructor(private subjectsService: SubjectsService) { }

    @ApiOperation({ summary: 'Create Subject' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateSubjectDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.subjectsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Subject was created',
            title: 'Subject Created',
        };
    }

    @ApiOperation({ summary: 'Find All Subjects' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterSubjectDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.subjectsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all subjects',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Subject' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.subjectsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find subject`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Subject' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateSubjectDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.subjectsService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `Subject was updated`,
            title: `Subject Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Subject' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseHttpModel> {
        const serviceResponse = await this.subjectsService.remove(id);

        return {
            data: serviceResponse.data,
            message: `Subject was deleted`,
            title: `Subject Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Subjects' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: SubjectEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.subjectsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Subjects was deleted`,
            title: `Subjects Deleted`,
        };
    }
}
