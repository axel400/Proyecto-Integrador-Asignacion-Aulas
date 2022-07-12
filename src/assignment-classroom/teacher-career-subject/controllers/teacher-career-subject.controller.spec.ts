import { Test, TestingModule } from '@nestjs/testing';
import { TeacherCareerSubjectController } from './teacher-career-subject.controller';
import { TeacherCareerSubjectService } from './teacher-career-subject.service';

describe('TeacherCareerSubjectController', () => {
  let controller: TeacherCareerSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherCareerSubjectController],
      providers: [TeacherCareerSubjectService],
    }).compile();

    controller = module.get<TeacherCareerSubjectController>(TeacherCareerSubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
