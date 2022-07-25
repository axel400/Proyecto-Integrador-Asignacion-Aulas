import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateRequestDetailDto,
  FilterRequestDetailDto,
  PaginationDto,
  UpdateRequestDetailDto,
} from '@core/dto';
import { RequestDetailEntity } from '@core/entities';
import {
  RequestsService,
  StatusService,
  TeacherDistributionsService,
} from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class RequestDetailsService {
  constructor(
    @Inject(RepositoryEnum.REQUEST_DETAIL_REPOSITORY)
    private requestDetailRepository: Repository<RequestDetailEntity>,
    private requestsService: RequestsService,
    private teacherDistributionsService: TeacherDistributionsService,
    private statusService: StatusService,
  ) {}

  async create(
    payload: CreateRequestDetailDto,
  ): Promise<ServiceResponseHttpModel> {
    const newRequestDetail = this.requestDetailRepository.create(payload);

    newRequestDetail.request = await this.requestsService.findOne(
      payload.request.id,
    );

    newRequestDetail.teacherDistribution =
      await this.teacherDistributionsService.findOne(
        payload.teacherDistribution.id,
      );

    newRequestDetail.state = await this.statusService.findOne(payload.state.id);

    const requestDetailCreated = await this.requestDetailRepository.save(
      newRequestDetail,
    );

    return { data: requestDetailCreated };
  }

  async findAll(
    params?: FilterRequestDetailDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.requestDetailRepository.findAndCount({
      relations: ['request', 'teacherDistribution', 'state'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const requestDetail = await this.requestDetailRepository.findOne({
      relations: ['request', 'teacherDistribution', 'state'],
      where: {
        id,
      },
    });

    if (!requestDetail) {
      throw new NotFoundException(
        `El detalle de la solicitud con id:  ${id} no se encontro`,
      );
    }
    return { data: requestDetail };
  }

  async update(
    id: number,
    payload: UpdateRequestDetailDto,
  ): Promise<ServiceResponseHttpModel> {
    const requestDetail = await this.requestDetailRepository.findOneBy({ id });
    if (!requestDetail) {
      throw new NotFoundException(
        `El detalle de la solicitud con id:  ${id} no se encontro`,
      );
    }
    this.requestDetailRepository.merge(requestDetail, payload);
    const requestDetailUpdated = await this.requestDetailRepository.save(
      requestDetail,
    );
    return { data: requestDetailUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const requestDetail = await this.requestDetailRepository.findOneBy({ id });

    if (!requestDetail) {
      throw new NotFoundException(
        `El detalle de la solicitud con id:  ${id} no se encontro`,
      );
    }

    const requestDetailDeleted = await this.requestDetailRepository.softRemove(
      requestDetail,
    );

    return { data: requestDetailDeleted };
  }

  async removeAll(
    payload: RequestDetailEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const requestDetailsDeleted = await this.requestDetailRepository.softRemove(
      payload,
    );
    return { data: requestDetailsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRequestDetailDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RequestDetailEntity>
      | FindOptionsWhere<RequestDetailEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ startDate: ILike(`%${search}%`) });
      where.push({ endDate: ILike(`%${search}%`) });
    }

    const response = await this.requestDetailRepository.findAndCount({
      relations: ['request', 'teacherDistribution', 'state'],
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
