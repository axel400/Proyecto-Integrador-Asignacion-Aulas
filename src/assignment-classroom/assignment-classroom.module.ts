import { Module } from "@nestjs/common";
import { CareerModule } from "./career/career.module";
import { CareersController } from "./career/controllers/careers.controller";
import { CareersService } from "./career/services/careers.service";
import { ClassroomModule } from "./classroom/classroom.module";
import { ClassroomController } from "./classroom/controllers/classroom.controller";
import { ClassroomsService } from "./classroom/services/classrooms.service";
import { CoursesController } from "./course/controllers/courses.controller";
import { CourseModule } from "./course/course.module";
import { CoursesService } from "./course/services/courses.service";
import { DaysController } from "./day/controllers/days.controller";
import { DayModule } from "./day/day.module";
import { DaysService } from "./day/services/days.service";
import { LevelsController } from "./level/controllers/levels.controller";
import { LevelModule } from "./level/level.module";
import { LevelsService } from "./level/services/levels.service";
import { SchedulesController } from "./schedule/controllers/schedules.controller";
import { ScheduleModule } from "./schedule/schedule.module";
import { SchedulesService } from "./schedule/services/schedules.service";
import { SchoolYearController } from "./school-year/controllers/school-year.controller";
import { SchoolYearModule } from "./school-year/school-year.module";
import { SchoolYearService } from "./school-year/services/school-year.service";
import { StatusController } from "./status/controllers/status.controller";
import { StatusService } from "./status/services/status.service";
import { StatusModule } from "./status/status.module";
import { SubjectController } from "./subject/controllers/subject.controller";
import { SubjectService } from "./subject/services/subject.service";
import { SubjectModule } from "./subject/subject.module";
import { TeacherController } from "./teacher/controllers/teacher.controller";
import { TeacherService } from "./teacher/services/teacher.service";
import { TeacherModule } from "./teacher/teacher.module";
import { WeekdaysController } from "./weekdays/controllers/weekdays.controller";
import { WeekdaysService } from "./weekdays/services/weekdays.service";
import { WeekdaysModule } from "./weekdays/weekdays.module";
import { UserModule } from './user/user.module';

@Module({
  providers: [WeekdaysService, SchedulesService,SubjectService, CareersService, ClassroomsService, CoursesService, DaysService, LevelsService, TeacherService, SchoolYearService, StatusService],
  controllers: [CareersController,ClassroomController, CoursesController, DaysController, LevelsController, SchedulesController, SubjectController, TeacherController, WeekdaysController,SchoolYearController, StatusController],
  imports: [LevelModule, ScheduleModule, CareerModule, ClassroomModule, CourseModule, DayModule, TeacherModule, SubjectModule, WeekdaysModule, UserModule,SchoolYearModule, StatusModule]
})
export class AssignmentClassroomModule {}
