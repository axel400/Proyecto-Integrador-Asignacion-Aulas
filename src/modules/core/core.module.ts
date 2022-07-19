import { Global, Module } from '@nestjs/common';
// import {
//   CareersController,
// } from '@core/controllers';
// import {
//   CareersService,
// } from '@core/services';
// import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CareerEntity,

} from '@core/entities';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  // controllers: [
  //   CareersController,
  // ],
  // providers: [
  //   ...coreProviders,
  //   CareersService,
  // ],
  // exports: [
  //   CareersService,
  // ],
})
export class CoreModule {}
