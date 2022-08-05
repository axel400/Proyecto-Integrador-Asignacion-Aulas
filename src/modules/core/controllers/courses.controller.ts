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
import { CreateCourseDto, UpdateCourseDto } from '../dto/course/course.dto';
import { FilterCourseDto } from '../dto/course/course.filter.dto';
import { CourseEntity } from '../entities/course.entity';
import { CoursesService } from '../services/courses.service';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) { }

    @ApiOperation({ summary: 'Create Course' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateCourseDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.coursesService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Course was created',
            title: 'Course Created',
        };
    }

    @ApiOperation({ summary: 'Find All Courses' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterCourseDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.coursesService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all courses',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Course' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.coursesService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find course`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Course' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCourseDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.coursesService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Course was updated`,
            title: `Course Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Course' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.coursesService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Course was deleted`,
            title: `Course Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Courses' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: CourseEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.coursesService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Courses was deleted`,
            title: `Courses Deleted`,
        };
    }
}
