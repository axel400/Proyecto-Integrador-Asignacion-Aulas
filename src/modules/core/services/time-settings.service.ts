import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateTimeSettingDto,
  FilterTimeSettingDto,
  PaginationDto,
  UpdateTimeSettingDto,
} from '@core/dto';
import { TimeSettingEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CareersService } from './careers.service';
import { SchoolDaysService } from './school-days.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeSettingsService {
  constructor(
    @InjectRepository(TimeSettingEntity)
    private timeSettingRepository: Repository<TimeSettingEntity>,
    private careersService: CareersService,
    private schoolDaysService: SchoolDaysService,
  ) {}

  async create(
    payload: CreateTimeSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    const newTimeSetting = this.timeSettingRepository.create(payload);

    newTimeSetting.career = await this.careersService.findOne(
      payload.career.id,
    );

    newTimeSetting.schoolDay = await this.schoolDaysService.findOne(
      payload.schoolDay.id,
    );

    const timeSettingCreated = await this.timeSettingRepository.save(
      newTimeSetting,
    );

    return { data: timeSettingCreated };
  }

  async findAll(
    params?: FilterTimeSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.timeSettingRepository.findAndCount({
      relations: ['career', 'schoolDay'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const timeSetting = await this.timeSettingRepository.findOne({
      relations: ['career', 'schoolDay'],
      where: {
        id,
      },
    });

    if (!timeSetting) {
      throw new NotFoundException(
        `La configuracion del horario con id:  ${id} no se encontro`,
      );
    }
    return { data: timeSetting };
  }

  async update(
    id: number,
    payload: UpdateTimeSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    const timeSetting = await this.timeSettingRepository.findOneBy({ id });
    if (!timeSetting) {
      throw new NotFoundException(
        `La configuracion del horario con id:  ${id} no se encontro`,
      );
    }
    timeSetting.career = await this.careersService.findOne(
      payload.career.id,
    );

    timeSetting.schoolDay = await this.schoolDaysService.findOne(
      payload.schoolDay.id,
    );
    this.timeSettingRepository.merge(timeSetting, payload);
    const timeSettingUpdated = await this.timeSettingRepository.save(
      timeSetting,
    );
    return { data: timeSettingUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const timeSetting = await this.timeSettingRepository.findOneBy({ id });

    if (!timeSetting) {
      throw new NotFoundException(
        `La configuracion del horario con id:  ${id} no se encontro`,
      );
    }

    const timeSettingDeleted = await this.timeSettingRepository.softRemove(
      timeSetting,
    );

    return { data: timeSettingDeleted };
  }

  async removeAll(
    payload: TimeSettingEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const timeSettingsDeleted = await this.timeSettingRepository.softRemove(
      payload,
    );
    return { data: timeSettingsDeleted };
  }

  private async paginateAndFilter(
    params: FilterTimeSettingDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TimeSettingEntity>
      | FindOptionsWhere<TimeSettingEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ weeklyHours: ILike(`%${search}%`) });
    }

    const response = await this.timeSettingRepository.findAndCount({
      relations: ['career', 'schoolDay'],
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
