import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { HourEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { CreateHourDto, UpdateHourDto } from '../dto/hour/hour.dto';
import { FilterHourDto } from '../dto/hour/hour.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HoursService {
  constructor(
    @InjectRepository(HourEntity)
    private hourRepository: Repository<HourEntity>,
  ) { }

  async create(payload: CreateHourDto): Promise<ServiceResponseHttpModel> {
    const newHour = this.hourRepository.create(payload);

    const hourCreated = await this.hourRepository.save(newHour);

    return { data: hourCreated };
  }

  async findAll(params?: FilterHourDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.hourRepository.findAndCount({
      relations: ['schedulePosition', 'state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const hour = await this.hourRepository.findOne({
      relations: ['schedulePosition', 'state'],
      where: { id: id }
    });

    if (!hour) {
      throw new NotFoundException(`La hora con id:${id} no se encontro`);
    }

    return { data: hour };
  }

  async update(id: number, payload: UpdateHourDto): Promise<ServiceResponseHttpModel> {
    const hour = await this.hourRepository.findOneBy({ id });

    if (!hour) {
      throw new NotFoundException(`La hora con id:${id} no se encontro`);
    }

    this.hourRepository.merge(hour, payload);

    const hourUpdated = await this.hourRepository.save(hour);

    return { data: hourUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const hour = await this.hourRepository.findOneBy({ id });

    if (!hour) {
      throw new NotFoundException(`La hora con id:${id} no se encontro`);
    }

    const hourDeleted = await this.hourRepository.softRemove(hour);

    return { data: hourDeleted };
  }

  async removeAll(payload: HourEntity[]): Promise<ServiceResponseHttpModel> {
    const hoursDeleted = await this.hourRepository.softRemove(payload);

    return { data: hoursDeleted };
  }

  private async paginateAndFilter(params: FilterHourDto): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<HourEntity>
      | FindOptionsWhere<HourEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ hour: ILike(`%${search}%`) });
    }

    const response = await this.hourRepository.findAndCount({
      relations: ['schedulePosition', 'state'],
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
