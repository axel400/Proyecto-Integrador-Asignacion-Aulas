import { Global, Module } from '@nestjs/common';
//import {} from '@core/controllers';
import { CareersService, ClassroomsService, ColorsService, CoursesService, DaysService, HoursService, LevelsService, LocationsService, ParallelsService, RequestDetailsService, RequestsService, ScheduleConfigurationsService, SchedulePositionsService, SchoolDaysService, SchoolYearsService, StatusService, SubjectsService, TeacherDistributionsService, TeachersService, TimeSettingsService } from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
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
