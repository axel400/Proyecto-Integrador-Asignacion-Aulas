import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersController } from './career/controllers/careers.controller';
import { Career } from './career/entities/career.entity';
import { CareersService } from './career/services/careers.service';
import { ClassroomController } from './classroom/controllers/classroom.controller';
import { Classroom } from './classroom/entities/classroom.entity';
import { ClassroomsService } from './classroom/services/classrooms.service';
import { CoursesController } from './course/controllers/courses.controller';
import { Course } from './course/entities/course.entity';
import { CoursesService } from './course/services/courses.service';
import { DaysController } from './day/controllers/days.controller';
import { Day } from './day/entities/day.entity';
import { DaysService } from './day/services/days.service';
import { GeneralScheduleController } from './general-schedule/controllers/general-schedule.controller';
import { GeneralSchedule } from './general-schedule/entities/general-schedule.entity';
import { GeneralScheduleService } from './general-schedule/services/general-schedule.service';
import { JourneysController } from './journey/controllers/journeys.controller';
import { Journey } from './journey/entities/journey.entity';
import { JourneysService } from './journey/services/journeys.service';
import { LevelsController } from './level/controllers/levels.controller';
import { Level } from './level/entities/level.entity';
import { LevelsService } from './level/services/levels.service';
import { SchedulesController } from './schedule/controllers/schedules.controller';
import { Schedule } from './schedule/entities/schedule.entity';
import { SchedulesService } from './schedule/services/schedules.service';
import { SchoolYearController } from './school-year/controllers/school-year.controller';
import { SchoolYear } from './school-year/entities/school-year.entity';
import { SchoolYearService } from './school-year/services/school-year.service';
import { StatusController } from './status/controllers/status.controller';
import { Status } from './status/entities/status.entity';
import { StatusService } from './status/services/status.service';
import { SubjectController } from './subject/controllers/subject.controller';
import { Subject } from './subject/entities/subject.entity';
import { SubjectService } from './subject/services/subject.service';
import { TeacherCareerSubjectController } from './teacher-career-subject/controllers/teacher-career-subject.controller';
import { TeacherCareerSubject } from './teacher-career-subject/entities/teacher-career-subject.entity';
import { TeacherCareerSubjectService } from './teacher-career-subject/services/teacher-career-subject.service';
import { TeacherController } from './teacher/controllers/teacher.controller';
import { Teacher } from './teacher/entities/teacher.entity';
import { TeacherService } from './teacher/services/teacher.service';
import { User } from './user/entities/user.entity';
import { UsersService } from './user/services/user.service';
@Module({
  providers: [CoursesService, SubjectService, TeacherService, UsersService, LevelsService, CareersService, DaysService, SchoolYearService,StatusService, ClassroomsService, SchedulesService, JourneysService,GeneralScheduleService, TeacherCareerSubjectService],
  controllers: [SubjectController, TeacherController, CoursesController, CoursesController, LevelsController, CareersController, DaysController, SchoolYearController, StatusController, ClassroomController, SchedulesController,JourneysController,GeneralScheduleController,TeacherCareerSubjectController],
  imports: [TypeOrmModule.forFeature([Career, Classroom, Course, Day, Level, Schedule, SchoolYear, Status, Subject, Teacher, User,Journey, GeneralSchedule,TeacherCareerSubject])],
})
export class AssignmentClassroomModule { }
