import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateSchoolDayDto,
  FilterSchoolDayDto,
  PaginationDto,
  UpdateSchoolDayDto,
} from '@core/dto';
import { ScheduleConfigurationEntity, SchoolDayEntity } from '@core/entities';
import {} from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SchoolDaysService {
  constructor(
    @InjectRepository(SchoolDayEntity)
    private schoolDayRepository: Repository<SchoolDayEntity>,
  ) {}

  async create(payload: CreateSchoolDayDto): Promise<ServiceResponseHttpModel> {
    const newSchoolDay = this.schoolDayRepository.create(payload);

    const schoolDayCreated = await this.schoolDayRepository.save(newSchoolDay);

    return { data: schoolDayCreated };
  }

  async findAll(
    params?: FilterSchoolDayDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.schoolDayRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const schoolDay = await this.schoolDayRepository.findOne({
      where: {
        id,
      },
    });

    if (!schoolDay) {
      throw new NotFoundException(`La jornada con id:  ${id} no se encontro`);
    }
    return { data: schoolDay };
  }

  async update(
    id: number,
    payload: UpdateSchoolDayDto,
  ): Promise<ServiceResponseHttpModel> {
    const schoolDay = await this.schoolDayRepository.findOneBy({ id });
    if (!schoolDay) {
      throw new NotFoundException(`La jornada con id:  ${id} no se encontro`);
    }
    this.schoolDayRepository.merge(schoolDay, payload);
    const schoolDayUpdated = await this.schoolDayRepository.save(schoolDay);
    return { data: schoolDayUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const schoolDay = await this.schoolDayRepository.findOneBy({ id });

    if (!schoolDay) {
      throw new NotFoundException(`La jornada con id:  ${id} no se encontro`);
    }

    const schoolDayDeleted = await this.schoolDayRepository.softRemove(
      schoolDay,
    );

    return { data: schoolDayDeleted };
  }

  async removeAll(
    payload: SchoolDayEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const schoolDaysDeleted = await this.schoolDayRepository.softRemove(
      payload,
    );
    return { data: schoolDaysDeleted };
  }

  private async paginateAndFilter(
    params: FilterSchoolDayDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SchoolDayEntity>
      | FindOptionsWhere<SchoolDayEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.schoolDayRepository.findAndCount({
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
