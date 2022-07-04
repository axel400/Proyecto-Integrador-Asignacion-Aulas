import { Module } from '@nestjs/common';
import { SchoolYearController } from './controllers/school-year.controller';
import { SchoolYearService } from './services/school-year.service';

@Module({
  controllers: [SchoolYearController],
  providers: [SchoolYearService]
})
export class SchoolYearModule {}
