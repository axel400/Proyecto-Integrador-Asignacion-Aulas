import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerEntity, ClassroomEntity, ColorEntity, CourseEntity, DayEntity, HourEntity, LevelEntity, LocationEntity, ParallelEntity, RequestEntity, ScheduleConfigurationEntity, SchedulePositionEntity, SchoolDayEntity, SchoolYearEntity, StateEntity, SubjectEntity, TeacherDistributionEntity, TeacherEntity, TimeSettingEntity } from './entities';
import { CareersController } from './controllers/careers.controller';
import { CareersService } from './services/careers.service';
import { ClassroomsService } from './services/classrooms.service';
import { ColorsService } from './services/colors.service';
import { CoursesService } from './services/courses.service';
import { DaysService } from './services/days.service';
import { HoursService } from './services/hours.service';
import { LevelsService } from './services/levels.service';
import { LocationsService } from './services/locations.service';
import { ParallelsService } from './services/parallels.service';
import { ScheduleConfigurationsService } from './services/schedule-configurations.service';
import { RequestsService } from './services/requests.service';
import { SchedulePositionsService } from './services/schedule-position.service';
import { SchoolDaysService } from './services/school-days.service';
import { SchoolYearsService } from './services/school-years.service';
import { StatusService } from './services/status.service';
import { SubjectsService } from './services/subjects.service';
import { TeacherDistributionsService } from './services/teacher-distributions.service';
import { TeachersService } from './services/teachers.service';
import { TimeSettingsService } from './services/time-settings.service';
import { ClassroomsController } from './controllers/classrooms.controller';
import { ColorsController } from './controllers/colors.controller';
import { CoursesController } from './controllers/courses.controller';
import { DaysController } from './controllers/days.controller';
import { HoursController } from './controllers/hours.controller';
import { LevelsController } from './controllers/levels.controller';
import { LocationsController } from './controllers/locations.controller';
import { ParallelsController } from './controllers/parallel.controller';
import { RequestsController } from './controllers/requests.controller';
import { ScheduleConfigurationsController } from './controllers/schedule-configurations.controller';
import { SchedulePositionsController } from './controllers/schedule-positions.controller';
import { SchoolDaysController } from './controllers/school-days.controller';
import { SchoolYearsController } from './controllers/school-years.controller';
import { StatusController } from './controllers/status.controller';
import { subjectsController } from './controllers/subject.controller';
import { TeacherDistributionsController } from './controllers/teacher-distributions.controller';
import { TeachersController } from './controllers/teacher.controller';
import { TimeSettingsController } from './controllers/time-setting.controller';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CareerEntity, ClassroomEntity, ColorEntity, CourseEntity, DayEntity, HourEntity, LevelEntity, LocationEntity, ParallelEntity, RequestEntity, ScheduleConfigurationEntity, SchedulePositionEntity, SchoolDayEntity, SchoolYearEntity, StateEntity, SubjectEntity, TeacherEntity, TeacherDistributionEntity, TimeSettingEntity])],
  controllers: [
    CareersController,
    ClassroomsController,
    ColorsController,
    CoursesController,
    DaysController,
    HoursController,
    LevelsController,
    LocationsController,
    ParallelsController,
    RequestsController,
    ScheduleConfigurationsController,
    SchedulePositionsController,
    SchoolDaysController,
    SchoolYearsController,
    StatusController,
    subjectsController,
    TeacherDistributionsController,
    TeachersController,
    TimeSettingsController
  ],
  providers: [
    CareersService,
    ClassroomsService,
    ColorsService,
    CoursesService,
    DaysService,
    HoursService,
    LevelsService,
    LocationsService,
    ParallelsService,
    RequestsService,
    ScheduleConfigurationsService,
    SchedulePositionsService,
    SchoolDaysService,
    SchoolYearsService,
    StatusService,
    SubjectsService,
    TeacherDistributionsService,
    TeachersService,
    TimeSettingsService,
  ],
  exports: [
    CareersService,
    ClassroomsService,
    ColorsService,
    CoursesService,
    DaysService,
    HoursService,
    LevelsService,
    LocationsService,
    ParallelsService,
    RequestsService,
    ScheduleConfigurationsService,
    SchedulePositionsService,
    SchoolDaysService,
    SchoolYearsService,
    StatusService,
    SubjectsService,
    TeacherDistributionsService,
    TeachersService,
    TimeSettingsService,
  ],
})
export class CoreModule { }
