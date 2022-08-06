import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateLevelDto, FilterLevelDto, PaginationDto, UpdateLevelDto } from '@core/dto';
import { LevelEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
  ) { }

  async create(payload: CreateLevelDto): Promise<ServiceResponseHttpModel> {
    const newLevel = this.levelRepository.create(payload);

    const levelCreated = await this.levelRepository.save(newLevel);

    return { data: levelCreated };
  }

  async findAll(params?: FilterLevelDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.levelRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const level = await this.levelRepository.findOne({
      where: { id: id }
    });

    if (!level) {
      throw new NotFoundException(`El nivel con id:${id} no se encontro`);
    }

    return { data: level };
  }

  async update(id: number, payload: UpdateLevelDto): Promise<ServiceResponseHttpModel> {
    const level = await this.levelRepository.findOneBy({ id });

    if (!level) {
      throw new NotFoundException(`El nivel con id:${id} no se encontro`);
    }

    this.levelRepository.merge(level, payload);

    const levelUpdated = await this.levelRepository.save(level);

    return { data: levelUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const level = await this.levelRepository.findOneBy({ id });

    if (!level) {
      throw new NotFoundException(`El nivel con id:${id} no se encontro`);
    }

    const levelDeleted = await this.levelRepository.softRemove(level);

    return { data: levelDeleted };
  }

  async removeAll(payload: LevelEntity[]): Promise<ServiceResponseHttpModel> {
    const levelsDeleted = await this.levelRepository.softRemove(payload);

    return { data: levelsDeleted };
  }

  private async paginateAndFilter(params: FilterLevelDto): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<LevelEntity>
      | FindOptionsWhere<LevelEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.levelRepository.findAndCount({
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
