import { Test, TestingModule } from '@nestjs/testing';
import { TeacherCareerSubjectService } from './teacher-career-subject.service';

describe('TeacherCareerSubjectService', () => {
  let service: TeacherCareerSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherCareerSubjectService],
    }).compile();

    service = module.get<TeacherCareerSubjectService>(TeacherCareerSubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
