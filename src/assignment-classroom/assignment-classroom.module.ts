import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';
import { WeekdaysService } from './services/weekdays/weekdays.service';
import { WeekdaysController } from './controllers/week/weekdays.controller';
import { LevelsController } from './controllers/levels/levels.controller';
import { LevelsService } from './services/levels/levels.service';
import { SchedulesController } from './controllers/schedules/schedules.controller';
import { SchedulesService } from './services/schedules/schedules.service';
import { TeacherController } from './controllers/teacher/teacher.controller';
import { TeacherService } from './services/teacher/teacher.service';
import { SubjectService } from './services/subject/subject.service';
import { SubjectController } from './controllers/subject/subject.controller';
import { CoursesController } from './controllers/course/courses.controller';
import { DaysController } from './controllers/day/days.controller';
import { CoursesService } from './services/courses/courses.service';
import { DaysService } from './services/days/days.service';

@Module({
  providers: [AssignmentClassroomService, WeekdaysService, LevelsService, SchedulesService,TeacherService, SubjectService, CoursesService, DaysService],
  controllers: [AssignmentClassroomController, WeekdaysController, LevelsController, SchedulesController,TeacherController, SubjectController, CoursesController, DaysController]
})
export class AssignmentClassroomModule {}
