import { Global, Module } from '@nestjs/common';
// import {
//   CareersController,
// } from '@core/controllers';
import {

} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    
  ],
  providers: [
    ...coreProviders,

  ],
  exports: [
    ...coreProviders,

  ],
})
export class CoreModule {}
