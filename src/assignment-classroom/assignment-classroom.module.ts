import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';
import { WeekdaysService } from './services/weekdays/weekdays.service';
import { WeekdaysController } from './controllers/week/weekdays.controller';
import { LevelsController } from './controllers/levels/levels.controller';
import { LevelsService } from './services/levels/levels.service';
import { SchedulesController } from './controllers/schedules/schedules.controller';
import { SchedulesService } from './services/schedules/schedules.service';

@Module({
  providers: [AssignmentClassroomService, WeekdaysService, LevelsService, SchedulesService],
  controllers: [AssignmentClassroomController, WeekdaysController, LevelsController, SchedulesController]
})
export class AssignmentClassroomModule {}
