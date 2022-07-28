import { Global, Module } from '@nestjs/common';
//import {} from '@core/controllers';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';
import { CareersService, ClassroomsService, ColorsService, CoursesService, DaysService, HoursService, LevelsService, LocationsService, ParallelsService, RequestDetailsService, RequestsService, ScheduleConfigurationsService, SchedulePositionsService, SchoolDaysService, SchoolYearsService, StatusService, SubjectsService, TeacherDistributionsService, TeachersService, TimeSettingsService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerEntity, ClassroomEntity, ColorEntity, CourseEntity, DayEntity, HourEntity, LevelEntity, LocationEntity, ParallelEntity, RequestDetailEntity, RequestEntity, ScheduleConfigurationEntity, SchedulePositionEntity, SchoolDayEntity, SchoolYearEntity, StateEntity, SubjectEntity, TeacherDistributionEntity, TeacherEntity, TimeSettingEntity } from './entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CareerEntity,ClassroomEntity, ColorEntity,CourseEntity, DayEntity, HourEntity,LevelEntity,LocationEntity,ParallelEntity,RequestDetailEntity, RequestEntity,ScheduleConfigurationEntity, SchedulePositionEntity,SchoolDayEntity,SchoolYearEntity,StateEntity, SubjectEntity, TeacherEntity, TeacherDistributionEntity,TimeSettingEntity])],
  controllers: [],
  providers: [
    ...coreProviders,
    CareersService,
    ClassroomsService,
    ColorsService,
    CoursesService,
    DaysService,
    HoursService,
    LevelsService,
    LocationsService,
    ParallelsService,
    RequestDetailsService,
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
    ...coreProviders,
    CareersService,
    ClassroomsService,
    ColorsService,
    CoursesService,
    DaysService,
    HoursService,
    LevelsService,
    LocationsService,
    ParallelsService,
    RequestDetailsService,
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
export class CoreModule {}
