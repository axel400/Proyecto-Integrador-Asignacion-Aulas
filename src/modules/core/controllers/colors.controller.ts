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
import { CreateColorDto, UpdateColorDto } from '../dto/color/color.dto';
import { FilterColorDto } from '../dto/color/color.filter.dto';
import { ColorEntity } from '../entities/color.entity';
import { ColorsService } from '../services/colors.service';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
    constructor(private colorsService: ColorsService) { }

    @ApiOperation({ summary: 'Create Color' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateColorDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.colorsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Color was created',
            title: 'Color Created',
        };
    }

    @ApiOperation({ summary: 'Find All Colors' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterColorDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.colorsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all Colors',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Color' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.colorsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find color`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Color' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateColorDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.colorsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Color was updated`,
            title: `Color Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Color' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.colorsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Color was deleted`,
            title: `Color Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Colors' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ColorEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.colorsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Colors was deleted`,
            title: `Colors Deleted`,
        };
    }
}
