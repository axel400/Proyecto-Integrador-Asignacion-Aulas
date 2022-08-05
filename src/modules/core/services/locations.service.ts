import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateLocationDto,
  FilterLocationDto,
  PaginationDto,
  UpdateLocationDto,
} from '@core/dto';
import { LocationEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) { }

  async create(payload: CreateLocationDto): Promise<ServiceResponseHttpModel> {
    const newLocation = this.locationRepository.create(payload);

    const locationCreated = await this.locationRepository.save(newLocation);

    return { data: locationCreated };
  }

  async findAll(params?: FilterLocationDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.locationRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number): Promise<any> {
    const location = await this.locationRepository.findOne({
      where: {
        id:id
      },
    });

    if (!location) {
      throw new NotFoundException(`La ubicacion con id:${id} no se encontro`);
    }
    return { data: location };
  }

  async update(
    id: number,
    payload: UpdateLocationDto,
  ): Promise<ServiceResponseHttpModel> {
    const location = await this.locationRepository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`La ubicacion con id:${id} no se encontro`);
    }
    this.locationRepository.merge(location, payload);
    const locationUpdated = await this.locationRepository.save(location);
    return { data: locationUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const location = await this.locationRepository.findOneBy({ id });

    if (!location) {
      throw new NotFoundException(`La ubicacion con id:${id} no se encontro`);
    }

    const locationDeleted = await this.locationRepository.softRemove(location);

    return { data: locationDeleted };
  }

  async removeAll(
    payload: LocationEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const locationsDeleted = await this.locationRepository.softRemove(payload);
    return { data: locationsDeleted };
  }

  private async paginateAndFilter(
    params: FilterLocationDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<LocationEntity>
      | FindOptionsWhere<LocationEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ buildingName: ILike(`%${search}%`) });
    }

    const response = await this.locationRepository.findAndCount({
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
