import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';
import { WeekdaysService } from './services/weekdays/weekdays.service';
import { WeekdaysController } from './controllers/week/weekdays.controller';
import { CoursesController } from './controllers/course/courses.controller';
import { DaysController } from './controllers/day/days.controller';
import { CoursesService } from './services/courses/courses.service';
import { DaysService } from './services/days/days.service';

@Module({
  providers: [AssignmentClassroomService, WeekdaysService, CoursesService, DaysService],
  controllers: [AssignmentClassroomController, WeekdaysController, CoursesController, DaysController]
})
export class AssignmentClassroomModule {}
