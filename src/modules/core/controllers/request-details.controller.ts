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
import { CreateRequestDetailDto, UpdateRequestDetailDto } from '../dto/request-detail/request-detail.dto';
import { FilterRequestDetailDto } from '../dto/request-detail/request-detail.filter.dto';
import { RequestDetailEntity } from '../entities/request-detail.entity';
import { RequestDetailsService } from '../services/request-details.service';

@ApiTags('RequestDetail')
@Controller('request-details')
export class RequestDetailsController {
    constructor(private requestDetailsService: RequestDetailsService) { }

    @ApiOperation({ summary: 'Create Request-detail' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateRequestDetailDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestDetailsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Request-detail was created',
            title: 'Request-detail Created',
        };
    }

    @ApiOperation({ summary: 'Find All Request-detail' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterRequestDetailDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestDetailsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all request-details',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Request-detail' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestDetailsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find request-detail`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Request-detail' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateRequestDetailDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestDetailsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Request-detail was updated`,
            title: `Request-detail Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Request-detail' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestDetailsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Request-detail was deleted`,
            title: `Request-detail Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All RequestDetail' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: RequestDetailEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestDetailsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `RequestDetail was deleted`,
            title: `RequestDetail Deleted`,
        };
    }
}
