import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateTeacherDto,
  FilterTeacherDto,
  PaginationDto,
  UpdateTeacherDto,
} from '@core/dto';
import { TeacherEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { StatusService } from './status.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    private statussService: StatusService,
  ) { }

  async create(payload: CreateTeacherDto): Promise<ServiceResponseHttpModel> {
    const newTeacher = this.teacherRepository.create(payload);

    //newTeacher.state = await this.statussService.findOne(payload.state.id);

    const teacherCreated = await this.teacherRepository.save(newTeacher);

    return { data: teacherCreated };
  }

  async findAll(params?: FilterTeacherDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.teacherRepository.findAndCount({
      relations: ['state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const teacher = await this.teacherRepository.findOne({
      relations: ['state'],
      where: {
        id:id
      },
    });

    if (!teacher) {
      throw new NotFoundException(`El docente con id:${id} no se encontro`);
    }
    return { data: teacher };
  }

  async update(
    id: number,
    payload: UpdateTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    const teacher = await this.teacherRepository.findOneBy({ id });
    if (!teacher) {
      throw new NotFoundException(`El docente con id:${id} no se encontro`);
    }
    //teacher.state = await this.statussService.findOne(payload.state.id);
    this.teacherRepository.merge(teacher, payload);
    const teacherUpdated = await this.teacherRepository.save(teacher);
    return { data: teacherUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) {
      throw new NotFoundException(`El docente con id:${id} no se encontro`);
    }

    const teacherDeleted = await this.teacherRepository.softRemove(teacher);

    return { data: teacherDeleted };
  }

  async removeAll(payload: TeacherEntity[]): Promise<ServiceResponseHttpModel> {
    const teachersDeleted = await this.teacherRepository.softRemove(payload);
    return { data: teachersDeleted };
  }

  private async paginateAndFilter(
    params: FilterTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TeacherEntity>
      | FindOptionsWhere<TeacherEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ idCard: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ email: ILike(`%${search}%`) });
      where.push({ telephone: ILike(`%${search}%`) });
    }

    const response = await this.teacherRepository.findAndCount({
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
