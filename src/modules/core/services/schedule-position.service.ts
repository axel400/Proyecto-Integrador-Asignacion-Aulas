import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateSchedulePositionDto, FilterSchedulePositionDto, PaginationDto, UpdateSchedulePositionDto } from '@core/dto';
import { SchedulePositionEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SchedulePositionsService {
  constructor(
    @InjectRepository(SchedulePositionEntity)
    private schedulePositionRepository: Repository<SchedulePositionEntity>,
  ) { }

  async create(payload: CreateSchedulePositionDto): Promise<ServiceResponseHttpModel> {
    const newSchedulePosition = this.schedulePositionRepository.create(payload);

    const schedulePositionCreated = await this.schedulePositionRepository.save(newSchedulePosition);

    return { data: schedulePositionCreated };
  }

  async findAll(params?: FilterSchedulePositionDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.schedulePositionRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const schedulePosition = await this.schedulePositionRepository.findOne({
      where: { id: id }
    });

    if (!schedulePosition) {
      throw new NotFoundException(`La posicion del horario con id:${id} no se encontro`);
    }
    return { data: schedulePosition };
  }

  async update(id: number, payload: UpdateSchedulePositionDto): Promise<ServiceResponseHttpModel> {
    const schedulePosition = await this.schedulePositionRepository.findOneBy({ id });

    if (!schedulePosition) {
      throw new NotFoundException(`La posicion del horario con id:${id} no se encontro`);
    }

    this.schedulePositionRepository.merge(schedulePosition, payload);

    const schedulePositionUpdated = await this.schedulePositionRepository.save(schedulePosition);

    return { data: schedulePositionUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const schedulePosition = await this.schedulePositionRepository.findOneBy({ id });

    if (!schedulePosition) {
      throw new NotFoundException(`La posicion del horario con id:${id} no se encontro`);
    }

    const schedulePositionDeleted = await this.schedulePositionRepository.softRemove(schedulePosition);

    return { data: schedulePositionDeleted };
  }

  async removeAll(payload: SchedulePositionEntity[]): Promise<ServiceResponseHttpModel> {
    const schedulePositionsDeleted = await this.schedulePositionRepository.softRemove(payload);

    return { data: schedulePositionsDeleted };
  }

  private async paginateAndFilter(params: FilterSchedulePositionDto): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SchedulePositionEntity>
      | FindOptionsWhere<SchedulePositionEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
    }

    const response = await this.schedulePositionRepository.findAndCount({
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
