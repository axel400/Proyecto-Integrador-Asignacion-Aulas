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
import { CreateSchoolDayDto, UpdateSchoolDayDto } from '../dto/school-day/school-day.dto';
import { FilterSchoolDayDto } from '../dto/school-day/school-day.filter.dto';
import { SchoolDayEntity } from '../entities/school-day.entity';
import { SchoolDaysService } from '../services/school-days.service';

@ApiTags('SchoolDays')
@Controller('school-days')
export class SchoolDaysController {
    constructor(private schoolDaysService: SchoolDaysService) { }

    @ApiOperation({ summary: 'Create School-day' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateSchoolDayDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolDaysService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'School-day was created',
            title: 'School-day Created',
        };
    }

    @ApiOperation({ summary: 'Find All School-days' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterSchoolDayDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolDaysService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all school-days',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find School-day' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolDaysService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find school-day`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update school-day' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateSchoolDayDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolDaysService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `School-day was updated`,
            title: `School-day Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete School-day' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolDaysService.remove(id);
        return {
            data: serviceResponse.data,
            message: `School-day was deleted`,
            title: `School-day Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All School-days' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: SchoolDayEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.schoolDaysService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `School-days was deleted`,
            title: `School-days Deleted`,
        };
    }
}
