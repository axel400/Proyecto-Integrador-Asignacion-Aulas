import { Module } from '@nestjs/common';
import { CareersService } from './services/careers.service';
import { CareersController } from './controllers/careers.controller';

@Module({
  controllers: [CareersController],
  providers: [CareersService]
})
export class CareerModule {}
