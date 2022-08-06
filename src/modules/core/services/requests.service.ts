import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateRequestDto, FilterRequestDto, PaginationDto, UpdateRequestDto } from '@core/dto';
import { RequestEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestsRepository: Repository<RequestEntity>,
  ) { }

  async create(payload: CreateRequestDto): Promise<ServiceResponseHttpModel> {
    const newRequest = this.requestsRepository.create(payload);

    const requestCreated = await this.requestsRepository.save(newRequest);

    return { data: requestCreated };
  }

  async findAll(params?: FilterRequestDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.requestsRepository.findAndCount({
      relations: ['career', 'teacherDistribution', 'state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const request = await this.requestsRepository.findOne({
      relations: ['career', 'teacherDistribution', 'state'],
      where: { id: id }
    });

    if (!request) {
      throw new NotFoundException(`La solicitud con id:${id} no se encontro`);
    }

    return { data: request };
  }

  async update(id: number, payload: UpdateRequestDto): Promise<ServiceResponseHttpModel> {
    const request = await this.requestsRepository.findOneBy({ id });

    if (!request) {
      throw new NotFoundException(`La solicitud con id:${id} no se encontro`);
    }

    this.requestsRepository.merge(request, payload);

    const requestUpdated = await this.requestsRepository.save(request);

    return { data: requestUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const request = await this.requestsRepository.findOneBy({ id });

    if (!request) {
      throw new NotFoundException(`La solicitud con id:${id} no se encontro`);
    }

    const requestDeleted = await this.requestsRepository.softRemove(request);

    return { data: requestDeleted };
  }

  async removeAll(payload: RequestEntity[]): Promise<ServiceResponseHttpModel> {
    const requestsDeleted = await this.requestsRepository.softRemove(payload);

    return { data: requestsDeleted };
  }

  private async paginateAndFilter(params: FilterRequestDto): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RequestEntity>
      | FindOptionsWhere<RequestEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ date: ILike(`%${search}%`) });
      where.push({ totalHoursRequested: ILike(`%${search}%`) });
      where.push({ startDate: ILike(`%${search}%`) });
      where.push({ endDate: ILike(`%${search}%`) });
    }

    const response = await this.requestsRepository.findAndCount({
      relations: ['career', 'teacherDistribution', 'state'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}
