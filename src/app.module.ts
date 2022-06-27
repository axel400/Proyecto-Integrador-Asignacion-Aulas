import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentClassroomModule } from './assignment-classroom/assignment-classroom.module';


@Module({
  imports: [AssignmentClassroomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
