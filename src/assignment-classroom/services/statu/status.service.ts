import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStatusDto, UpdateStatusDto } from 'src/assignment-classroom/dtos/status.dto';
import { Status } from 'src/assignment-classroom/entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statuRepository: Repository<Status>,
      ) {}
    
      async create(payload: CreateStatusDto) {
        const newStatus = this.statuRepository.create(payload);
    
        return await this.statuRepository.save(newStatus);
      }
    
      async delete(id: number) {
        return await this.statuRepository.softDelete(id);
      }
    
      async findAll() {
        return await this.statuRepository.find();
      }
    
      async findOne(id: number) {
        const status = await this.statuRepository.findOne({
          where: {
            id: id,
          },
        });
    
        if (status === null) {
          throw new NotFoundException('El estado no es encontro');
        }
    
        return status;
      }
    
      async update(id: number, payload: UpdateStatusDto) {
        const status = await this.statuRepository.findOne({
          where: {
            id: id,
          },
        });
    
        if (status === null) {
          throw new NotFoundException('El estado no se encontro');
        }
    
        this.statuRepository.merge(status, payload);
    
        return this.statuRepository.save(status);
      }
}
