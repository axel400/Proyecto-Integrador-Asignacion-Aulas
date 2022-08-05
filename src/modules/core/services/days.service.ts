import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateDayDto,
  FilterDayDto,
  PaginationDto,
  UpdateDayDto,
} from '@core/dto';
import { DayEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(DayEntity)
    private dayRepository: Repository<DayEntity>,
  ) { }

  async create(payload: CreateDayDto): Promise<ServiceResponseHttpModel> {
    const newDay = this.dayRepository.create(payload);

    const dayCreated = await this.dayRepository.save(newDay);

    return { data: dayCreated };
  }

  async findAll(params?: FilterDayDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.dayRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const day = await this.dayRepository.findOne({
      where: {
        id:id
      },
    });

    if (!day) {
      throw new NotFoundException(`El dia con id:${id} no se encontro`);
    }
    return { data: day };
  }

  async update(
    id: number,
    payload: UpdateDayDto,
  ): Promise<ServiceResponseHttpModel> {
    const day = await this.dayRepository.findOneBy({ id });
    if (!day) {
      throw new NotFoundException(`El dia con id:${id} no se encontro`);
    }
    this.dayRepository.merge(day, payload);
    const dayUpdated = await this.dayRepository.save(day);
    return { data: dayUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const day = await this.dayRepository.findOneBy({ id });

    if (!day) {
      throw new NotFoundException(`El dia con id:${id} no se encontro`);
    }

    const dayDeleted = await this.dayRepository.softRemove(day);

    return { data: dayDeleted };
  }

  async removeAll(payload: DayEntity[]): Promise<ServiceResponseHttpModel> {
    const daysDeleted = await this.dayRepository.softRemove(payload);
    return { data: daysDeleted };
  }

  private async paginateAndFilter(
    params: FilterDayDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<DayEntity> | FindOptionsWhere<DayEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.dayRepository.findAndCount({
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
