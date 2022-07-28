import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateScheduleConfigurationDto,
  FilterScheduleConfigurationDto,
  PaginationDto,
  UpdateScheduleConfigurationDto,
} from '@core/dto';
import { ScheduleConfigurationEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { ClassroomsService } from './classrooms.service';
import { DaysService } from './days.service';
import { HoursService } from './hours.service';
import { TeacherDistributionsService } from './teacher-distributions.service';
import { ColorsService } from './colors.service';
import { StatusService } from './status.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleConfigurationsService {
  constructor(
    @InjectRepository(ScheduleConfigurationEntity)
    private scheduleConfigurationRepository: Repository<ScheduleConfigurationEntity>,
    private classroomsService: ClassroomsService,
    private daysService: DaysService,
    private hoursService: HoursService,
    private teacherDistributionsService: TeacherDistributionsService,
    private colorsService: ColorsService,
    private statusService: StatusService,
  ) {}

  async create(
    payload: CreateScheduleConfigurationDto,
  ): Promise<ServiceResponseHttpModel> {
    const newScheduleConfiguration =
      this.scheduleConfigurationRepository.create(payload);

    newScheduleConfiguration.classroom = await this.classroomsService.findOne(
      payload.classroom.id,
    );

    newScheduleConfiguration.day = await this.daysService.findOne(
      payload.day.id,
    );

    newScheduleConfiguration.hour = await this.hoursService.findOne(
      payload.hour.id,
    );

    newScheduleConfiguration.teacherDistribution =
      await this.teacherDistributionsService.findOne(
        payload.teacherDistribution.id,
      );

    newScheduleConfiguration.color = await this.colorsService.findOne(
      payload.color.id,
    );

    newScheduleConfiguration.state = await this.statusService.findOne(
      payload.state.id,
    );

    const scheduleConfugurationCreated =
      await this.scheduleConfigurationRepository.save(newScheduleConfiguration);

    return { data: scheduleConfugurationCreated };
  }

  async findAll(
    params?: FilterScheduleConfigurationDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.scheduleConfigurationRepository.findAndCount({
      relations: [
        'classroom',
        'day',
        'hour',
        'teacherDistribution',
        'color',
        'state',
      ],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const scheduleConfiguration =
      await this.scheduleConfigurationRepository.findOne({
        relations: [
          'classroom',
          'day',
          'hour',
          'teacherDistribution',
          'color',
          'state',
        ],
        where: {
          id,
        },
      });

    if (!scheduleConfiguration) {
      throw new NotFoundException(
        `La configuracion del horario con id:  ${id} no se encontro`,
      );
    }
    return { data: scheduleConfiguration };
  }

  async update(
    id: number,
    payload: UpdateScheduleConfigurationDto,
  ): Promise<ServiceResponseHttpModel> {
    const scheduleConfiguration =
      await this.scheduleConfigurationRepository.findOneBy({ id });
    if (!scheduleConfiguration) {
      throw new NotFoundException(
        `La configuracion del horario con id:  ${id} no se encontro`,
      );
    }
    scheduleConfiguration.classroom = await this.classroomsService.findOne(
      payload.classroom.id,
    );

    scheduleConfiguration.day = await this.daysService.findOne(
      payload.day.id,
    );

    scheduleConfiguration.hour = await this.hoursService.findOne(
      payload.hour.id,
    );

    scheduleConfiguration.teacherDistribution =
      await this.teacherDistributionsService.findOne(
        payload.teacherDistribution.id,
      );

    scheduleConfiguration.color = await this.colorsService.findOne(
      payload.color.id,
    );

    scheduleConfiguration.state = await this.statusService.findOne(
      payload.state.id,
    );
    this.scheduleConfigurationRepository.merge(scheduleConfiguration, payload);
    const scheduleConfigurationUpdated =
      await this.scheduleConfigurationRepository.save(scheduleConfiguration);
    return { data: scheduleConfigurationUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const scheduleConfiguration =
      await this.scheduleConfigurationRepository.findOneBy({ id });

    if (!scheduleConfiguration) {
      throw new NotFoundException(
        `La configuracion del horario con id:  ${id} no se encontro`,
      );
    }

    const scheduleConfigurationDeleted =
      await this.scheduleConfigurationRepository.softRemove(
        scheduleConfiguration,
      );

    return { data: scheduleConfigurationDeleted };
  }

  async removeAll(
    payload: ScheduleConfigurationEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const scheduleConfigurationsDeleted =
      await this.scheduleConfigurationRepository.softRemove(payload);
    return { data: scheduleConfigurationsDeleted };
  }

  private async paginateAndFilter(
    params: FilterScheduleConfigurationDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ScheduleConfigurationEntity>
      | FindOptionsWhere<ScheduleConfigurationEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ date: ILike(`%${search}%`) });
    }

    const response = await this.scheduleConfigurationRepository.findAndCount({
      relations: [
        'classroom',
        'day',
        'hour',
        'teacherDistribution',
        'color',
        'state',
      ],
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
