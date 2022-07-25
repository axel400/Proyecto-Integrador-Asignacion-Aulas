import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateParallelDto,
  FilterParallelDto,
  PaginationDto,
  UpdateParallelDto,
} from '@core/dto';
import { ParallelEntity } from '@core/entities';
import {} from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class ParallelsService {
  constructor(
    @Inject(RepositoryEnum.PARALLEL_REPOSITORY)
    private parallelRepository: Repository<ParallelEntity>,
  ) {}

  async create(payload: CreateParallelDto): Promise<ServiceResponseHttpModel> {
    const newParallel = this.parallelRepository.create(payload);

    const parallelCreated = await this.parallelRepository.save(newParallel);

    return { data: parallelCreated };
  }

  async findAll(params?: FilterParallelDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.parallelRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const parallel = await this.parallelRepository.findOne({
      where: {
        id,
      },
    });

    if (!parallel) {
      throw new NotFoundException(`El paralelo con id:  ${id} no se encontro`);
    }
    return { data: parallel };
  }

  async update(
    id: number,
    payload: UpdateParallelDto,
  ): Promise<ServiceResponseHttpModel> {
    const parallel = await this.parallelRepository.findOneBy({ id });
    if (!parallel) {
      throw new NotFoundException(`El paralelo con id:  ${id} no se encontro`);
    }
    this.parallelRepository.merge(parallel, payload);
    const parallelUpdated = await this.parallelRepository.save(parallel);
    return { data: parallelUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const parallel = await this.parallelRepository.findOneBy({ id });

    if (!parallel) {
      throw new NotFoundException(`El paralelo con id:  ${id} no se encontro`);
    }

    const parallelDeleted = await this.parallelRepository.softRemove(parallel);

    return { data: parallelDeleted };
  }

  async removeAll(
    payload: ParallelEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const parallelsDeleted = await this.parallelRepository.softRemove(payload);
    return { data: parallelsDeleted };
  }

  private async paginateAndFilter(
    params: FilterParallelDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ParallelEntity>
      | FindOptionsWhere<ParallelEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.parallelRepository.findAndCount({
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
