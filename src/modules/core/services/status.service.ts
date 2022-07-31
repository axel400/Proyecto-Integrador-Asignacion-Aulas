import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateStateDto,
  FilterStateDto,
  PaginationDto,
  UpdateStateDto,
} from '@core/dto';
import { StateEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
  ) { }

  async create(payload: CreateStateDto): Promise<ServiceResponseHttpModel> {
    const newState = this.stateRepository.create(payload);

    const stateCreated = await this.stateRepository.save(newState);

    return { data: stateCreated };
  }

  async findAll(params?: FilterStateDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.stateRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const state = await this.stateRepository.findOne({
      where: {
        id,
      },
    });

    if (!state) {
      throw new NotFoundException(`El estado con id:${id} no se encontro`);
    }
    return { data: state };
  }

  async update(
    id: number,
    payload: UpdateStateDto,
  ): Promise<ServiceResponseHttpModel> {
    const state = await this.stateRepository.findOneBy({ id });
    if (!state) {
      throw new NotFoundException(`El estado con id:${id} no se encontro`);
    }
    this.stateRepository.merge(state, payload);
    const stateUpdated = await this.stateRepository.save(state);
    return { data: stateUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const state = await this.stateRepository.findOneBy({ id });

    if (!state) {
      throw new NotFoundException(`El estado con id:${id} no se encontro`);
    }

    const stateDeleted = await this.stateRepository.softRemove(state);

    return { data: stateDeleted };
  }

  async removeAll(payload: StateEntity[]): Promise<ServiceResponseHttpModel> {
    const statusDeleted = await this.stateRepository.softRemove(payload);
    return { data: statusDeleted };
  }

  private async paginateAndFilter(
    params: FilterStateDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<StateEntity> | FindOptionsWhere<StateEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.stateRepository.findAndCount({
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
