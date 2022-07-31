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
import { CreateLevelDto, UpdateLevelDto } from '../dto/level/level.dto';
import { FilterLevelDto } from '../dto/level/level.filter.dto';
import { LevelEntity } from '../entities/level.entity';
import { LevelsService } from '../services/levels.service';

@ApiTags('Levels')
@Controller('levels')
export class LevelsController {
    constructor(private levelsService: LevelsService) { }

    @ApiOperation({ summary: 'Create Level' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateLevelDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.levelsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Level was created',
            title: 'Level Created',
        };
    }

    @ApiOperation({ summary: 'Find All Levels' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterLevelDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.levelsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all levels',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Level' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.levelsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find level`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Level' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateLevelDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.levelsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Level was updated`,
            title: `Level Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Level' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.levelsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Level was deleted`,
            title: `Level Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Levels' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: LevelEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.levelsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Levels was deleted`,
            title: `Levels Deleted`,
        };
    }
}
