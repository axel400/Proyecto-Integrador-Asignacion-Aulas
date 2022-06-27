import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';
import { WeekdaysService } from './services/weekdays/weekdays.service';
import { WeekdaysController } from './controllers/week/weekdays.controller';

@Module({
  providers: [AssignmentClassroomService, WeekdaysService],
  controllers: [AssignmentClassroomController, WeekdaysController]
})
export class AssignmentClassroomModule {}
