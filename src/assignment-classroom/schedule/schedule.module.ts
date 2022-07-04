import { Module } from '@nestjs/common';
import { SchedulesController } from './controllers/schedules.controller';
import { SchedulesService } from './services/schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class ScheduleModule {}
