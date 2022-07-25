import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateSubjectDto,
  FilterSubjectDto,
  PaginationDto,
  UpdateSubjectDto,
} from '@core/dto';
import { SubjectEntity } from '@core/entities';
import { CareersService, LocationsService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(RepositoryEnum.SUBJECT_REPOSITORY)
    private subjectRepository: Repository<SubjectEntity>,
    private careersService: CareersService,
  ) {}

  async create(payload: CreateSubjectDto): Promise<ServiceResponseHttpModel> {
    const newSubject = this.subjectRepository.create(payload);

    newSubject.career = await this.careersService.findOne(payload.career.id);

    const subjectCreated = await this.subjectRepository.save(newSubject);

    return { data: subjectCreated };
  }

  async findAll(params?: FilterSubjectDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.subjectRepository.findAndCount({
      relations: ['career'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const subject = await this.subjectRepository.findOne({
      relations: ['career'],
      where: {
        id,
      },
    });

    if (!subject) {
      throw new NotFoundException(
        `La asignatura con id:  ${id} no se encontro`,
      );
    }
    return { data: subject };
  }

  async update(
    id: number,
    payload: UpdateSubjectDto,
  ): Promise<ServiceResponseHttpModel> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new NotFoundException(
        `La asignatura con id:  ${id} no se encontro`,
      );
    }
    subject.career = await this.careersService.findOne(payload.career.id);
    this.subjectRepository.merge(subject, payload);
    const subjectUpdated = await this.subjectRepository.save(subject);
    return { data: subjectUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException(
        `La asignatura con id:  ${id} no se encontro`,
      );
    }

    const subjectDeleted = await this.subjectRepository.softRemove(subject);

    return { data: subjectDeleted };
  }

  async removeAll(payload: SubjectEntity[]): Promise<ServiceResponseHttpModel> {
    const subjectsDeleted = await this.subjectRepository.softRemove(payload);
    return { data: subjectsDeleted };
  }

  private async paginateAndFilter(
    params: FilterSubjectDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<SubjectEntity>
      | FindOptionsWhere<SubjectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ theoreticalHours: ILike(`%${search}%`) });
      where.push({ practicalHours: ILike(`%${search}%`) });
    }

    const response = await this.subjectRepository.findAndCount({
      relations: ['career'],
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
