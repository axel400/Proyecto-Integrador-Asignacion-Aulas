import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateRequestDto,
  FilterRequestDto,
  PaginationDto,
  UpdateRequestDto,
} from '@core/dto';
import { RequestEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { SchoolYearsService } from './school-years.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CareersService } from './careers.service';
import { TeachersService } from './teachers.service';
import { CoursesService } from './courses.service';
import { SubjectsService } from './subjects.service';
import { StatusService } from './status.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestsRepository: Repository<RequestEntity>,
    private schoolYearsService: SchoolYearsService,
    private careersService: CareersService,
    private teachersService: TeachersService,
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private statusService: StatusService,
  ) { }

  async create(payload: CreateRequestDto): Promise<ServiceResponseHttpModel> {
    const newRequest = this.requestsRepository.create(payload);

    newRequest.schoolYear = await this.schoolYearsService.findOne(payload.schoolYear.id);

    newRequest.career = await this.careersService.findOne(payload.career.id);

    newRequest.teacher = await this.teachersService.findOne(payload.teacher.id);

    newRequest.course = await this.coursesService.findOne(payload.course.id);

    newRequest.subject = await this.subjectsService.findOne(payload.subject.id);

    newRequest.state = await this.statusService.findOne(payload.state.id);


    const requestCreated = await this.requestsRepository.save(newRequest);

    return { data: requestCreated };
  }

  async findAll(params?: FilterRequestDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.requestsRepository.findAndCount({
      relations: ['schoolYear','career','teacher','course','subject','state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const request = await this.requestsRepository.findOne({
      relations: ['schoolYear','career','teacher','course','subject','state'],
      where: {
        id,
      },
    });

    if (!request) {
      throw new NotFoundException(`La solicitud con id:${id} no se encontro`);
    }
    return { data: request };
  }

  async update(
    id: number,
    payload: UpdateRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) {
      throw new NotFoundException(`La solicitud con id:${id} no se encontro`);
    }

    request.schoolYear = await this.schoolYearsService.findOne(payload.schoolYear.id);

    request.career = await this.careersService.findOne(payload.career.id);

    request.teacher = await this.teachersService.findOne(payload.teacher.id);

    request.course = await this.coursesService.findOne(payload.course.id);

    request.subject = await this.subjectsService.findOne(payload.subject.id);

    request.state = await this.statusService.findOne(payload.state.id);

    this.requestsRepository.merge(request, payload);
    const requestUpdated = await this.requestsRepository.save(request);
    return { data: requestUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const request = await this.requestsRepository.findOneBy({ id });

    if (!request) {
      throw new NotFoundException(`La solicitud con id:${id} no se encontro`);
    }

    const requestDeleted = await this.requestsRepository.softRemove(request);

    return { data: requestDeleted };
  }

  async removeAll(payload: RequestEntity[]): Promise<ServiceResponseHttpModel> {
    const requestsDeleted = await this.requestsRepository.softRemove(payload);
    return { data: requestsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RequestEntity>
      | FindOptionsWhere<RequestEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ date: ILike(`%${search}%`) });
      where.push({ totalHoursRequested: ILike(`%${search}%`) });
      where.push({ startDate: ILike(`%${search}%`) });
      where.push({ endDate: ILike(`%${search}%`) });
    }

    const response = await this.requestsRepository.findAndCount({
      relations: ['schoolYear','career','teacher','course','subject','state'],
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
