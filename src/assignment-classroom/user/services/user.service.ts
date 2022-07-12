import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) { }

  //Traer todo
  async findAll() {
    return await this.usersRepo.find();
  }

  //Traer por id
  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }

    return user;
  }

  //Crear
  async create(payload: CreateUserDto) {
    const newUser = this.usersRepo.create(payload);

    return await this.usersRepo.save(newUser);
  }

  //Editar
  async update(id: number, payload: UpdateUserDto) {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }

    await this.usersRepo.merge(user, payload);

    return await this.usersRepo.save(user);
  }

  //Eliminar
  async remove(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }

    return await this.usersRepo.softDelete(id);
  }
  
}