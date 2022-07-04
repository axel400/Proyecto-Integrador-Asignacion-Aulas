import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto, UpdateStatusDto } from 'src/assignment-classroom/status/dtos/status.dto';
import { Status } from 'src/assignment-classroom/status/entities/status.entity';


@Injectable()
export class StatusService {
    private counterId = 1;
  
  private status: Status[] = [
    {
      id: 1,
      name: 'Primero',
    },
  ];

  findAll() {
    return this.status;
  }

  findOne(id: number) {
    const status = this.status.find((item) => item.id === id);
    if (!status) {
      throw new NotFoundException(`Estado #${id} no encontrado`);
    }
    return status;
  }

  create(data: CreateStatusDto) {
    this.counterId = this.counterId + 1;
    const newStatus = {
      id: this.counterId,
      ...data,
    };
    this.status.push(newStatus);
    return newStatus;
  }

  update(id: number, payload: UpdateStatusDto) {
    const status = this.findOne(id);
    if (status) {
      const index = this.status.findIndex((item) => item.id === id);
      this.status[index] = {
        ...status,
        ...payload,
      };
      return this.status[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.status.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Estado #${id} no encontrado`);
    }
    this.status.splice(index, 1);
    return true;
  }
}
