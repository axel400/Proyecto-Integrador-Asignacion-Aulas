import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateSchoolYearDto,
  FilterSchoolYearDto,
  PaginationDto,
  UpdateSchoolYearDto,
} from '@core/dto';
import { SchoolYearEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { StatusService } from './status.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SchoolYearsService {
  constructor(
    @InjectRepository(SchoolYearEntity)
    private schoolYearRepository: Repository<SchoolYearEntity>,
    private statusService: StatusService,
  ) { }

  async create(
    payload: CreateSchoolYearDto,
  ): Promise<ServiceResponseHttpModel> {
    const newSchoolYear = this.schoolYearRepository.create(payload);

    newSchoolYear.state = await this.statusService.findOne(payload.state.id);

    const schoolYearCreated = await this.schoolYearRepository.save(
      newSchoolYear,
    );

    return { data: schoolYearCreated };
  }

  async findAll(
    params?: FilterSchoolYearDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.schoolYearRepository.findAndCount({
      relations: ['state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const schoolYear = await this.schoolYearRepository.findOne({
      relations: ['state'],
      where: {
        id,
      },
    });

    if (!schoolYear) {
      throw new NotFoundException(
        `El periodo lectivo con id:${id} no se encontro`,
      );
    }
    return { data: schoolYear };
  }

  async update(
    id: number,
    payload: UpdateSchoolYearDto,
  ): Promise<ServiceResponseHttpModel> {
    const schoolYear = await this.schoolYearRepository.findOneBy({ id });
    if (!schoolYear) {
      throw new NotFoundException(
        `El periodo lectivo con id:${id} no se encontro`,
      );
    }
    schoolYear.state = await this.statusService.findOne(payload.state.id);
    this.schoolYearRepository.merge(schoolYear, payload);
    const schoolYearUpdated = await this.schoolYearRepository.save(schoolYear);
    return { data: schoolYearUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const schoolYear = await this.schoolYearRepository.findOneBy({ id });

    if (!schoolYear) {
      throw new NotFoundException(
        `El periodo lectivo con id:${id} no se encontro`,
      );
    }

    const schoolYearDeleted = await this.schoolYearRepository.softRemove(
      schoolYear,
    );

    return { data: schoolYearDeleted };
  }

  async removeAll(
    payload: SchoolYearEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const schoolYearsDeleted = await this.schoolYearRepository.softRemove(
      payload,
    );
    return { data: schoolYearsDeleted };
  }

  private async paginateAndFilter(
    params: FilterSchoolYearDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SchoolYearEntity>
      | FindOptionsWhere<SchoolYearEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.schoolYearRepository.findAndCount({
      relations: ['state'],
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
