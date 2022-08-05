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
import { CreateClassroomDto, UpdateClassroomDto } from '../dto/classroom/classroom.dto';
import { FilterClassroomDto } from '../dto/classroom/classroom.filter.dto';
import { ClassroomEntity } from '../entities/classroom.entity';
import { ClassroomsService } from '../services/classrooms.service';

@ApiTags('Classroms')
@Controller('classrooms')
export class ClassroomsController {
    constructor(private classroomsService: ClassroomsService) { }

    @ApiOperation({ summary: 'Create Classroom' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateClassroomDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.classroomsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Classroom was created',
            title: 'Classroom Created',
        };
    }

    @ApiOperation({ summary: 'Find All Classrooms' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterClassroomDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.classroomsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all classrooms',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Classroom' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.classroomsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find classroom`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Classroom' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateClassroomDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.classroomsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Classroom was updated`,
            title: `Classroom Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Classroom' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.classroomsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Classroom was deleted`,
            title: `Classroom Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Classrooms' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ClassroomEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.classroomsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Classrooms was deleted`,
            title: `Classrooms Deleted`,
        };
    }
}
