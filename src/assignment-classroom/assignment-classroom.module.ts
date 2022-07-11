import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CareersController } from './career/controllers/careers.controller';
import { Career } from './career/entities/career.entity';
//
import { ClassroomController } from './classroom/controllers/classroom.controller';
import { Classroom } from './classroom/entities/classroom.entity';
import { ClassroomsService } from './classroom/services/classrooms.service';
import { CoursesController } from './course/controllers/courses.controller';
import { Course } from './course/entities/course.entity';
import { CoursesService } from './course/services/courses.service';
import { DaysController } from './day/controllers/days.controller';
import { Day } from './day/entities/day.entity';
import { DaysService } from './day/services/days.service';
import { LevelsController } from './level/controllers/levels.controller';
import { Level } from './level/entities/level.entity';
import { LevelsService } from './level/services/levels.service';
import { SchedulesController } from './schedule/controllers/schedules.controller';
import { Schedule } from './schedule/entities/schedule.entity';
import { SchedulesService } from './schedule/services/schedules.service';
//import { SchoolYearController } from './school-year/controllers/school-year.controller';
import { SchoolYear } from './school-year/entities/school-year.entity';
//import { SchoolYearService } from './school-year/services/school-year.service';
import { Status } from './status/entities/status.entity';
import { StatusService } from './status/services/status.service';
import { SubjectController } from './subject/controllers/subject.controller';
import { Subject } from './subject/entities/subject.entity';
import { SubjectService } from './subject/services/subject.service';
import { TeacherController } from './teacher/controllers/teacher.controller';
import { Teacher } from './teacher/entities/teacher.entity';
import { TeacherService } from './teacher/services/teacher.service';
import { User } from './user/entities/user.entity';
import { UsersService } from './user/services/user.service';
import { WeekdaysController } from './weekdays/controllers/weekdays.controller';
import { WeekdayDays } from './weekdays/entities/weekdays.entity';
import { WeekdaysService } from './weekdays/services/weekdays.service';
@Module({
  providers: [ClassroomsService, CoursesService, DaysService, SchedulesService, StatusService, SubjectService, TeacherService, UsersService, WeekdaysService, LevelsService],
  controllers: [ClassroomController, DaysController, SchedulesController, SubjectController, TeacherController, WeekdaysController, DaysController, CoursesController, CoursesController, LevelsController],
  imports: [TypeOrmModule.forFeature([Career, Classroom, Course, Day, Level, Schedule, SchoolYear, Status, Subject, Teacher, User, WeekdayDays])],
})
export class AssignmentClassroomModule { }
