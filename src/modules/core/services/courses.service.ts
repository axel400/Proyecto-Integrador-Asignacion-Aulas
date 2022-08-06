import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { CreateCourseDto, FilterCourseDto, PaginationDto, UpdateCourseDto } from '@core/dto';
import { CourseEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) { }

  async create(payload: CreateCourseDto): Promise<ServiceResponseHttpModel> {
    const newCourse = this.courseRepository.create(payload);

    const courseCreated = await this.courseRepository.save(newCourse);

    return { data: courseCreated };
  }

  async findAll(params?: FilterCourseDto): Promise<ServiceResponseHttpModel> {
    // //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.courseRepository.findAndCount({
      relations: ['level', 'parallel', 'schoolDay', 'career', 'tutor'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const course = await this.courseRepository.findOne({
      relations: ['level', 'parallel', 'schoolDay', 'career', 'tutor'],
      where: { id: id }
    });

    if (!course) {
      throw new NotFoundException(`El curso con id:${id} no se encontro`);
    }

    return { data: course };
  }

  async update(id: number, payload: UpdateCourseDto): Promise<ServiceResponseHttpModel> {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`El curso con id:${id} no se encontro`);
    }

    this.courseRepository.merge(course, payload);

    const courseUpdated = await this.courseRepository.save(course);

    return { data: courseUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`El curso con id:${id} no se encontro`);
    }

    const courseDeleted = await this.courseRepository.softRemove(course);

    return { data: courseDeleted };
  }

  async removeAll(payload: CourseEntity[]): Promise<ServiceResponseHttpModel> {
    const coursesDeleted = await this.courseRepository.softRemove(payload);

    return { data: coursesDeleted };
  }

  private async paginateAndFilter(params: FilterCourseDto): Promise<ServiceResponseHttpModel> {
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
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.courseRepository.findAndCount({
      relations: ['level', 'parallel', 'schoolDay', 'career', 'tutor'],
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
