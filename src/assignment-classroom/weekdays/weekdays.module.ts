import { Module } from '@nestjs/common';
import { WeekdaysController } from './controllers/weekdays.controller';
import { WeekdaysService } from './services/weekdays.service';

@Module({
  controllers: [WeekdaysController],
  providers: [WeekdaysService]
})
export class WeekdaysModule {}
