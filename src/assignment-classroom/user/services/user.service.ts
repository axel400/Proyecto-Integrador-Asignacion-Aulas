import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {

  //constructor(private productsService: ProductsService) {}

  private counterId = 1;
  
  private users: User[] = [
    {
      id: 1,
      email: 'ejemplo@gmail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }
    this.users.splice(index, 1);
    return true;
  }

  // getOrderByUser(id: number): Order { 
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: this.productsService.findAll(),
  //   };
  // }
}