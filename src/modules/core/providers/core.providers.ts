import { DataSource } from 'typeorm';
import { CatalogueEntity, CareerEntity, ClassroomEntity, CourseEntity, DayEntity, LevelEntity, SchoolYearEntity, StateEntity, SubjectEntity, TeacherEntity, HourEntity, LocationEntity, ParallelEntity, RequestEntity, ScheduleConfigurationEntity, SchoolDayEntity, TeacherDistributionEntity, TimeSettingEntity, } from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { SchedulePositionEntity } from '../entities/schedule-position.entity';

export const coreProviders = [
  {
    provide: RepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareerEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CLASSROOM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ClassroomEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COLOR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ClassroomEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.COURSE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CourseEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.DAY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DayEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.HOUR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HourEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.LEVEL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LevelEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.LOCATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LocationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PARALLEL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParallelEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.REQUEST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RequestEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHEDULE_CONFIGURATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ScheduleConfigurationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHEDULE_POSITION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SchedulePositionEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHOOL_DAY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SchoolDayEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHOOL_YEAR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SchoolYearEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STATE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StateEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TEACHER_DISTRIBUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherDistributionEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TIME_SETTING_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TimeSettingEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
