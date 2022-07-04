import { Module } from '@nestjs/common';
import { ClassroomController } from './controllers/classroom.controller';
import { ClassroomsService } from './services/classrooms.service';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomsService]
})
export class ClassroomModule {}
