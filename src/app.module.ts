import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentClassroomModule } from './assignment-classroom/assignment-classroom.module';


@Module({
  imports: [AssignmentClassroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
