import { DataSource } from 'typeorm';
import {
  CareerEntity, ClassroomEntity, CourseEntity, DayEntity, GeneralScheduleEntity, JourneyEntity, LevelEntity, ScheduleEntity, SchoolYearEntity, StatusEntity, SubjectEntity, TeacherCareerSubjectEntity, TeacherEntity,
} from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';

export const coreProviders = [
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
    provide: RepositoryEnum.GENERAL_SCHEDULE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GeneralScheduleEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.JOURNEY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(JourneyEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.LEVEL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LevelEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHEDULE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ScheduleEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SCHOOL_YEAR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SchoolYearEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STATUS_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StatusEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TEACHER_CAREER_SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherCareerSubjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
