import { DataSource } from 'typeorm';
import {
  CareerEntity,
} from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';

export const coreProviders = [
  {
    provide: RepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareerEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
