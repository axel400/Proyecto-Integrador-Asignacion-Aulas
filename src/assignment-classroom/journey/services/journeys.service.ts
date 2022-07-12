import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJourneyDto, UpdateJourneyDto } from '../dtos/journey.dto';
import { Journey } from '../entities/journey.entity';

@Injectable()
export class JourneysService {

  constructor(
    @InjectRepository(Journey) private journeyRepo: Repository<Journey>,
  ) { }

  //Traer todo
  async findAll() {
    return await this.journeyRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const journey = await this.journeyRepo.findOne({ where: { id } });

    if (!journey) {
      throw new NotFoundException(`Jornada #${id} no encontrada`);
    }

    return journey;
  }

  //Crear
  async create(payload: CreateJourneyDto) {
    const newJourney = this.journeyRepo.create(payload);

    return await this.journeyRepo.save(newJourney);
  }

  //Editar
  async update(id: number, payload: UpdateJourneyDto) {
    const journey = await this.journeyRepo.findOne({ where: { id } });

    if (!journey) {
      throw new NotFoundException(`Jornada #${id} no encontrada`);
    }

    await this.journeyRepo.merge(journey, payload);

    return await this.journeyRepo.save(journey);
  }

  //Eliminar
  async remove(id: number) {
    const journey = await this.journeyRepo.findOne({ where: { id } });

    if (!journey) {
      throw new NotFoundException(`Jornada #${id} no encontrada`);
    }

    return await this.journeyRepo.softDelete(id);
  }
  
}