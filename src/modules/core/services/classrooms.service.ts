import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  PaginationDto,
  CreateClassroomDto,
  FilterClassroomDto,
  UpdateClassroomDto,
} from '@core/dto';
import { ClassroomEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { LocationsService } from './locations.service';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusService } from './status.service';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(ClassroomEntity)
    private classroomRepository: Repository<ClassroomEntity>,
    private locationsService: LocationsService,
    private statusService: StatusService,
  ) { }

  async create(payload: CreateClassroomDto): Promise<ServiceResponseHttpModel>{
    const newClassroom = this.classroomRepository.create(payload);

    // newClassroom.location = await this.locationsService.findOne(
    //   payload.location.id,
    // );

    // newClassroom.state = await this.statusService.findOne(
    //   payload.state.id,
    // );

    const classroomCreated = await this.classroomRepository.save(newClassroom);

    return { data: classroomCreated };
  }

  async findAll(
    params?: FilterClassroomDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.classroomRepository.findAndCount({
      relations: ['location','state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
    //return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<any> {
    const classroom = await this.classroomRepository.findOne({
      relations: ['location','state'],
      where: {
        id,
      },
    });

    if (!classroom) {
      throw new NotFoundException(`El aula con id:${id} no se encontro`);
    }
    return { data: classroom };
  }

  async update(
    id: number,
    payload: UpdateClassroomDto,
  ): Promise<ServiceResponseHttpModel> {
    const classroom = await this.classroomRepository.findOneBy({ id });
    if (!classroom) {
      throw new NotFoundException(`El aula con id:${id} no se encontro`);
    }

    classroom.location = await this.locationsService.findOne(
      payload.location.id,
    );

    classroom.state = await this.statusService.findOne(
      payload.state.id,
    );

    this.classroomRepository.merge(classroom, payload);
    const classroomUpdated = await this.classroomRepository.save(classroom);
    return { data: classroomUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const classroom = await this.classroomRepository.findOneBy({ id });

    if (!classroom) {
      throw new NotFoundException(`El aula con id:${id} no se encontro`);
    }

    const classroomDeleted = await this.classroomRepository.softRemove(
      classroom,
    );

    return { data: classroomDeleted };
  }

  async removeAll(
    payload: ClassroomEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const classroomsDeleted = await this.classroomRepository.softRemove(
      payload,
    );
    return { data: classroomsDeleted };
  }

  private async paginateAndFilter(
    params: FilterClassroomDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ClassroomEntity>
      | FindOptionsWhere<ClassroomEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
      where.push({ capacity: ILike(`%${search}%`) });
    }

    const response = await this.classroomRepository.findAndCount({
      relations: ['location','state'],
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
