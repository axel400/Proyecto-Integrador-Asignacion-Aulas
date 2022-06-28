import { Module } from '@nestjs/common';
import { AssignmentClassroomService } from './services/assignment-classroom.service';
import { AssignmentClassroomController } from './controllers/assignment-classroom.controller';
import { WeekdaysService } from './services/weekdays/weekdays.service';
import { WeekdaysController } from './controllers/week/weekdays.controller';
import { TeacherController } from './controllers/teacher/teacher.controller';
import { TeacherService } from './services/teacher/teacher.service';
import { SubjectService } from './services/subject/subject.service';
import { SubjectController } from './controllers/subject/subject.controller';

@Module({
  providers: [AssignmentClassroomService, WeekdaysService, TeacherService, SubjectService],
  controllers: [AssignmentClassroomController, WeekdaysController, TeacherController, SubjectController]
})
export class AssignmentClassroomModule {}
