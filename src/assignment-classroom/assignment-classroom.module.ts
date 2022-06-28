import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';
import { WeekdaysService } from './services/weekdays/weekdays.service';
import { WeekdaysController } from './controllers/week/weekdays.controller';
import { StatusController } from './controllers/statu/status.controller';
import { StatusService } from './services/statu/status.service';
import { SchoolYearController } from './controllers/school-year/school-year.controller';
import { SchoolYearService } from './services/school-year/school-year.service';

@Module({
  providers: [AssignmentClassroomService, WeekdaysService, StatusService, SchoolYearService],
  controllers: [AssignmentClassroomController, WeekdaysController, StatusController, SchoolYearController]
})
export class AssignmentClassroomModule {}
