import { Module } from '@nestjs/common';
import { DaysController } from './controllers/days.controller';
import { DaysService } from './services/days.service';

@Module({
  controllers: [DaysController],
  providers: [DaysService]
})
export class DayModule {}
