import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateScheduleConfigurationDto, FilterScheduleConfigurationDto, PaginationDto, UpdateScheduleConfigurationDto } from '@core/dto';
import { ScheduleConfigurationEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleConfigurationsService {
  constructor(
    @InjectRepository(ScheduleConfigurationEntity)
    private scheduleConfigurationRepository: Repository<ScheduleConfigurationEntity>,
  ) { }

  async create(payload: CreateScheduleConfigurationDto): Promise<ServiceResponseHttpModel> {
    const newScheduleConfiguration = this.scheduleConfigurationRepository.create(payload);

    const scheduleConfugurationCreated = await this.scheduleConfigurationRepository.save(newScheduleConfiguration);

    return { data: scheduleConfugurationCreated };
  }

  async findAll(params?: FilterScheduleConfigurationDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.scheduleConfigurationRepository.findAndCount({
      relations: ['classroom', 'day', 'hour', 'color', 'state', 'request','request.career','request.state','request.teacherDistribution','request.teacherDistribution.schoolYear','request.teacherDistribution.subject','request.teacherDistribution.course','request.teacherDistribution.teacher'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const scheduleConfiguration = await this.scheduleConfigurationRepository.findOne({
      relations: ['classroom', 'day', 'hour', 'color', 'state', 'request','request.career','request.state','request.teacherDistribution','request.teacherDistribution.schoolYear','request.teacherDistribution.subject','request.teacherDistribution.course','request.teacherDistribution.teacher'],
      where: { id: id }
    });

    if (!scheduleConfiguration) {
      throw new NotFoundException(`La configuracion del horario con id:${id} no se encontro`);
    }

    return { data: scheduleConfiguration };
  }

  async update(id: number, payload: UpdateScheduleConfigurationDto): Promise<ServiceResponseHttpModel> {
    const scheduleConfiguration = await this.scheduleConfigurationRepository.findOneBy({ id });

    if (!scheduleConfiguration) {
      throw new NotFoundException(
        `La configuracion del horario con id:${id} no se encontro`,
      );
    }

    this.scheduleConfigurationRepository.merge(scheduleConfiguration, payload);

    const scheduleConfigurationUpdated = await this.scheduleConfigurationRepository.save(scheduleConfiguration);

    return { data: scheduleConfigurationUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const scheduleConfiguration = await this.scheduleConfigurationRepository.findOneBy({ id });

    if (!scheduleConfiguration) {
      throw new NotFoundException(`La configuracion del horario con id:${id} no se encontro`);
    }

    const scheduleConfigurationDeleted = await this.scheduleConfigurationRepository.softRemove(scheduleConfiguration);

    return { data: scheduleConfigurationDeleted };
  }

  async removeAll(payload: ScheduleConfigurationEntity[]): Promise<ServiceResponseHttpModel> {
    const scheduleConfigurationsDeleted = await this.scheduleConfigurationRepository.softRemove(payload);

    return { data: scheduleConfigurationsDeleted };
  }

  private async paginateAndFilter(params: FilterScheduleConfigurationDto): Promise<ServiceResponseHttpModel> {
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
      relations: ['classroom', 'day', 'hour', 'color', 'state', 'request','request.career','request.state','request.teacherDistribution','request.teacherDistribution.schoolYear','request.teacherDistribution.subject','request.teacherDistribution.course','request.teacherDistribution.teacher'],
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
