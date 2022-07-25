import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCourseDto,
  FilterCourseDto,
  PaginationDto,
  UpdateCourseDto,
} from '@core/dto';
import { CourseEntity } from '@core/entities';
import {
  CareersService,
  LevelsService,
  ParallelsService,
  SchoolDaysService,
} from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(RepositoryEnum.COURSE_REPOSITORY)
    private courseRepository: Repository<CourseEntity>,
    private schoolDaysService: SchoolDaysService,
    private parallelsService: ParallelsService,
    private levelsService: LevelsService,
    private careersService: CareersService,
  ) {}

  async create(payload: CreateCourseDto): Promise<ServiceResponseHttpModel> {
    const newCourse = this.courseRepository.create(payload);

    newCourse.level = await this.levelsService.findOne(payload.level.id);

    newCourse.parallel = await this.parallelsService.findOne(payload.parallel.id);

    newCourse.schoolDay = await this.schoolDaysService.findOne(payload.schoolDay.id);

    newCourse.career = await this.careersService.findOne(payload.career.id);

    const courseCreated = await this.courseRepository.save(newCourse);

    return { data: courseCreated };
  }

  async findAll(params?: FilterCourseDto): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.courseRepository.findAndCount({
      relations: ['level', 'parallel', 'schoolDay', 'career'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const course = await this.courseRepository.findOne({
      relations: ['level', 'parallel', 'schoolDay', 'career'],
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`El curso con id:  ${id} no se encontro`);
    }
    return { data: course };
  }

  async update(
    id: number,
    payload: UpdateCourseDto,
  ): Promise<ServiceResponseHttpModel> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`El curso con id:  ${id} no se encontro`);
    }
    course.level = await this.levelsService.findOne(payload.level.id);

    course.parallel = await this.parallelsService.findOne(payload.parallel.id);

    course.schoolDay = await this.schoolDaysService.findOne(payload.schoolDay.id);

    course.career = await this.careersService.findOne(payload.career.id);
    this.courseRepository.merge(course, payload);
    const courseUpdated = await this.courseRepository.save(course);
    return { data: courseUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`El curso con id:  ${id} no se encontro`);
    }

    const courseDeleted = await this.courseRepository.softRemove(course);

    return { data: courseDeleted };
  }

  async removeAll(payload: CourseEntity[]): Promise<ServiceResponseHttpModel> {
    const coursesDeleted = await this.courseRepository.softRemove(payload);
    return { data: coursesDeleted };
  }

  private async paginateAndFilter(
    params: FilterCourseDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CourseEntity>
      | FindOptionsWhere<CourseEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
    }

    const response = await this.courseRepository.findAndCount({
      relations: ['level', 'parallel', 'schoolDay', 'career'],
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
