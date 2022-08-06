import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateTeacherDistributionDto, FilterTeacherDistributionDto, PaginationDto, UpdateTeacherDistributionDto } from '@core/dto';
import { TeacherDistributionEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeacherDistributionsService {
  constructor(
    @InjectRepository(TeacherDistributionEntity)
    private teacherDistributionRepository: Repository<TeacherDistributionEntity>,
  ) { }

  async create(payload: CreateTeacherDistributionDto): Promise<ServiceResponseHttpModel> {
    const newTeacherDistribution = this.teacherDistributionRepository.create(payload);

    const teacherDistributionCreated = await this.teacherDistributionRepository.save(newTeacherDistribution);

    return { data: teacherDistributionCreated };
  }

  async findAll(params?: FilterTeacherDistributionDto): Promise<ServiceResponseHttpModel> {
    // //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.teacherDistributionRepository.findAndCount({
      relations: ['schoolYear', 'subject', 'course', 'teacher'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const teacherDistribution = await this.teacherDistributionRepository.findOne({
      relations: ['schoolYear', 'subject', 'course', 'teacher'],
      where: { id: id }
    });

    if (!teacherDistribution) {
      throw new NotFoundException(`La distribucion de docentes con id:${id} no se encontro`);
    }

    return { data: teacherDistribution };
  }

  async update(id: number, payload: UpdateTeacherDistributionDto): Promise<ServiceResponseHttpModel> {
    const teacherDistribution = await this.teacherDistributionRepository.findOneBy({ id });

    if (!teacherDistribution) {
      throw new NotFoundException(`La distribucion de docentes con id:${id} no se encontro`);
    }

    this.teacherDistributionRepository.merge(teacherDistribution, payload);

    const teacherDistributionUpdated = await this.teacherDistributionRepository.save(teacherDistribution);

    return { data: teacherDistributionUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const teacherDistribution = await this.teacherDistributionRepository.findOneBy({ id });

    if (!teacherDistribution) {
      throw new NotFoundException(`La distribucion de docentes con id:${id} no se encontro`);
    }

    const teacherDistributionDeleted = await this.teacherDistributionRepository.softRemove(teacherDistribution);

    return { data: teacherDistributionDeleted };
  }

  async removeAll(payload: TeacherDistributionEntity[]): Promise<ServiceResponseHttpModel> {
    const teacherDistributionsDeleted = await this.teacherDistributionRepository.softRemove(payload);

    return { data: teacherDistributionsDeleted };
  }

  private async paginateAndFilter(params: FilterTeacherDistributionDto): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TeacherDistributionEntity>
      | FindOptionsWhere<TeacherDistributionEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.teacherDistributionRepository.findAndCount({
      relations: ['schoolYear', 'subject', 'course', 'teacher'],
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
