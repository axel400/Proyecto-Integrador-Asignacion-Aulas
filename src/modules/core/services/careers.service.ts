import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCareerDto,
  UpdateCareerDto,
  FilterCareerDto,
  PaginationDto,
} from '@core/dto';
import { CareerEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(CareerEntity)
    private careerRepository: Repository<CareerEntity>,
  ) {}

  async create(payload: CreateCareerDto): Promise<ServiceResponseHttpModel> {
    const newCareer = this.careerRepository.create(payload);

    const careerCreated = await this.careerRepository.save(newCareer);

    return { data: careerCreated };
  }

  async findAll(params?: FilterCareerDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.careerRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const career = await this.careerRepository.findOne({
      where: {
        id,
      },
    });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    return { data: career };
  }

  async update(
    id: number,
    payload: UpdateCareerDto,
  ): Promise<ServiceResponseHttpModel> {
    const career = await this.careerRepository.findOneBy({ id });
    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }
    this.careerRepository.merge(career, payload);
    const careerUpdated = await this.careerRepository.save(career);
    return { data: careerUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const career = await this.careerRepository.findOneBy({ id });

    if (!career) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    const careerDeleted = await this.careerRepository.softRemove(career);

    return { data: careerDeleted };
  }

  async removeAll(payload: CareerEntity[]): Promise<ServiceResponseHttpModel> {
    const careersDeleted = await this.careerRepository.softRemove(payload);
    return { data: careersDeleted };
  }

  private async paginateAndFilter(
    params: FilterCareerDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CareerEntity>
      | FindOptionsWhere<CareerEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.careerRepository.findAndCount({
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
