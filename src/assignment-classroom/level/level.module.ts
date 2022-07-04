import { Module } from '@nestjs/common';
import { LevelsController } from './controllers/levels.controller';
import { LevelsService } from './services/levels.service';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService]
})
export class LevelModule {}
