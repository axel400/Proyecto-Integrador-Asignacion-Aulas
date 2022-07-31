import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateColorDto,
  FilterColorDto,
  PaginationDto,
  UpdateColorDto,
} from '@core/dto';
import { ColorEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ColorEntity)
    private colorRepository: Repository<ColorEntity>,
  ) { }

  async create(payload: CreateColorDto): Promise<ServiceResponseHttpModel> {
    const newColor = this.colorRepository.create(payload);

    const colorCreated = await this.colorRepository.save(newColor);

    return { data: colorCreated };
  }

  async findAll(params?: FilterColorDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.colorRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const color = await this.colorRepository.findOne({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException(`El color con id:${id} no se encontro`);
    }
    return { data: color };
  }

  async update(
    id: number,
    payload: UpdateColorDto,
  ): Promise<ServiceResponseHttpModel> {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) {
      throw new NotFoundException(`El color con id:${id} no se encontro`);
    }
    this.colorRepository.merge(color, payload);
    const colorUpdated = await this.colorRepository.save(color);
    return { data: colorUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const color = await this.colorRepository.findOneBy({ id });

    if (!color) {
      throw new NotFoundException(`El color con id:${id} no se encontro`);
    }

    const colorDeleted = await this.colorRepository.softRemove(color);

    return { data: colorDeleted };
  }

  async removeAll(payload: ColorEntity[]): Promise<ServiceResponseHttpModel> {
    const colorsDeleted = await this.colorRepository.softRemove(payload);
    return { data: colorsDeleted };
  }

  private async paginateAndFilter(
    params: FilterColorDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<ColorEntity> | FindOptionsWhere<ColorEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
    }

    const response = await this.colorRepository.findAndCount({
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
