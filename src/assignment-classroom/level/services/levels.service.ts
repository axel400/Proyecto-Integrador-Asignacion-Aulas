import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLevelDto, UpdateLevelDto } from 'src/assignment-classroom/level/dtos/level.dto';
import { Level } from 'src/assignment-classroom/level/entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelsService {

  constructor(
    @InjectRepository(Level) private levelsRepo: Repository<Level>,
  ) { }

  //Traer todo
  async findAll() {
    return await this.levelsRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const level = await this.levelsRepo.findOne({ where: { id } });

    if (!level) {
      throw new NotFoundException(`Nivel #${id} no encontrado`);
    }

    return level;
  }

  //Crear
  async create(payload: CreateLevelDto) {
    const newLevel = this.levelsRepo.create(payload);

    return await this.levelsRepo.save(newLevel);
  }

  //Editar
  async update(id: number, payload: UpdateLevelDto) {
    const level = await this.levelsRepo.findOne({ where: { id } });

    if (!level) {
      throw new NotFoundException(`Nivel #${id} no encontrado`);
    }

    await this.levelsRepo.merge(level, payload);

    return await this.levelsRepo.save(level);
  }

  //Eliminar
  async remove(id: number) {
    const level = await this.levelsRepo.findOne({ where: { id } });

    if (!level) {
      throw new NotFoundException(`Nivel #${id} no encontrado`);
    }

    return await this.levelsRepo.softDelete(id);
  }
  
}