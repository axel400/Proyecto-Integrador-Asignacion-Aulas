import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';
import {
  CreateTeacherDistributionDto,
  FilterTeacherDistributionDto,
  PaginationDto,
  UpdateTeacherDistributionDto,
} from '@core/dto';
import { TeacherDistributionEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { SchoolDaysService } from './school-days.service';
import { SubjectsService } from './subjects.service';
import { CoursesService } from './courses.service';
import { TeachersService } from './teachers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolYearsService } from './school-years.service';

@Injectable()
export class TeacherDistributionsService {
  constructor(
    @InjectRepository(TeacherDistributionEntity)
    private teacherDistributionRepository: Repository<TeacherDistributionEntity>,
    private schoolYearsService: SchoolYearsService,
    private subjectsService: SubjectsService,
    private coursesService: CoursesService,
    private teachersService: TeachersService,
  ) { }

  async create(
    payload: CreateTeacherDistributionDto,
  ): Promise<ServiceResponseHttpModel> {
    const newTeacherDistribution =
      this.teacherDistributionRepository.create(payload);

    newTeacherDistribution.schoolYear = await this.schoolYearsService.findOne(
      payload.schoolYear.id,
    );

    newTeacherDistribution.subject = await this.subjectsService.findOne(
      payload.subject.id,
    );

    newTeacherDistribution.course = await this.coursesService.findOne(
      payload.course.id,
    );

    newTeacherDistribution.teacher = await this.teachersService.findOne(
      payload.teacher.id,
    );

    const teacherDistributionCreated =
      await this.teacherDistributionRepository.save(newTeacherDistribution);

    return { data: teacherDistributionCreated };
  }

  async findAll(
    params?: FilterTeacherDistributionDto,
  ): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.teacherDistributionRepository.findAndCount({
      relations: ['schoolYear', 'subject', 'course', 'teacher'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const teacherDistribution =
      await this.teacherDistributionRepository.findOne({
        relations: ['schoolYear', 'subject', 'course', 'teacher'],
        where: {
          id,
        },
      });

    if (!teacherDistribution) {
      throw new NotFoundException(
        `La distribucion de docentes con id:${id} no se encontro`,
      );
    }
    return { data: teacherDistribution };
  }

  async update(
    id: number,
    payload: UpdateTeacherDistributionDto,
  ): Promise<ServiceResponseHttpModel> {
    const teacherDistribution =
      await this.teacherDistributionRepository.findOneBy({ id });
    if (!teacherDistribution) {
      throw new NotFoundException(
        `La distribucion de docentes con id:${id} no se encontro`,
      );
    }
    teacherDistribution.schoolYear = await this.schoolYearsService.findOne(
      payload.schoolYear.id,
    );

    teacherDistribution.subject = await this.subjectsService.findOne(
      payload.subject.id,
    );

    teacherDistribution.course = await this.coursesService.findOne(
      payload.course.id,
    );

    teacherDistribution.teacher = await this.teachersService.findOne(
      payload.teacher.id,
    );
    this.teacherDistributionRepository.merge(teacherDistribution, payload);
    const teacherDistributionUpdated =
      await this.teacherDistributionRepository.save(teacherDistribution);
    return { data: teacherDistributionUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const teacherDistribution =
      await this.teacherDistributionRepository.findOneBy({ id });

    if (!teacherDistribution) {
      throw new NotFoundException(
        `La distribucion de docentes con id:${id} no se encontro`,
      );
    }

    const teacherDistributionDeleted =
      await this.teacherDistributionRepository.softRemove(teacherDistribution);

    return { data: teacherDistributionDeleted };
  }

  async removeAll(
    payload: TeacherDistributionEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const teacherDistributionsDeleted =
      await this.teacherDistributionRepository.softRemove(payload);
    return { data: teacherDistributionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterTeacherDistributionDto,
  ): Promise<ServiceResponseHttpModel> {
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
