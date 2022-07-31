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
import { CreateRequestDto, UpdateRequestDto } from '../dto/request/request.dto';
import { FilterRequestDto } from '../dto/request/request.filter.dto';
import { RequestEntity } from '../entities/request.entity';
import { RequestsService } from '../services/requests.service';

@ApiTags('Request')
@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) { }

    @ApiOperation({ summary: 'Create Request' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateRequestDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestsService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'Request was created',
            title: 'Request Created',
        };
    }

    @ApiOperation({ summary: 'Find All Request' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterRequestDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestsService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: 'Find all requests',
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find Request' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestsService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `Find request`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update Request' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateRequestDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestsService.update(id, payload);
        return {
            data: serviceResponse.data,
            message: `Request was updated`,
            title: `Request Updated`,
        };
    }

    @ApiOperation({ summary: 'Delete Request' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestsService.remove(id);
        return {
            data: serviceResponse.data,
            message: `Request was deleted`,
            title: `Request Deleted`,
        };
    }

    @ApiOperation({ summary: 'Delete All Request' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: RequestEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.requestsService.removeAll(payload);

        return {
            data: serviceResponse.data,
            message: `Request was deleted`,
            title: `Request Deleted`,
        };
    }
}
