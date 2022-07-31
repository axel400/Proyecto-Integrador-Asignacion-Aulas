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
import { CreateSchoolYearDto, UpdateSchoolYearDto } from '../dto/school-year/school-year.dto';
import { FilterSchoolYearDto } from '../dto/school-year/school-year.filter.dto';
import { SchoolYearEntity } from '../entities/school-year.entity';
import { SchoolYearsService } from '../services/school-years.service';

@ApiTags('SchoolYears')
@Controller('school-years')
export class SchoolYearsController {
    constructor(private schoolYearsService: SchoolYearsService) { }

    @ApiOperation({ summary: 'Create School-year' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateSchoolYearDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolYearsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'School-year was created',
            title: 'School-year Created',
        };
    }

    @ApiOperation({ summary: 'Find All School-years' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterSchoolYearDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolYearsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all school-years',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find School-year' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolYearsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find school-year`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update school-year' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateSchoolYearDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolYearsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `School-year was updated`,
            title: `School-year Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete School-year' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolYearsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `School-year was deleted`,
            title: `School-year Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All School-years' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: SchoolYearEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolYearsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `School-years was deleted`,
            title: `School-years Deleted`,
        };
    }
}
