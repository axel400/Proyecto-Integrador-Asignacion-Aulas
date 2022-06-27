import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';

@Module({
  providers: [AssignmentClassroomService],
  controllers: [AssignmentClassroomController]
})
export class AssignmentClassroomModule {}
