import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentClassroomController } from './assignment-classroom.controller';

describe('AssignmentClassroomController', () => {
  let controller: AssignmentClassroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentClassroomController],
    }).compile();

    controller = module.get<AssignmentClassroomController>(AssignmentClassroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
