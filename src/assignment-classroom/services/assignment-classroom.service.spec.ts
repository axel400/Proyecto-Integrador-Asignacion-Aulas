import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentClassroomService } from './assignment-classroom.service';

describe('AssignmentClassroomService', () => {
  let service: AssignmentClassroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentClassroomService],
    }).compile();

    service = module.get<AssignmentClassroomService>(AssignmentClassroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
