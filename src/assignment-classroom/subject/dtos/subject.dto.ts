import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Journey } from 'src/assignment-classroom/journey/entities/journey.entity';
import { Course } from 'src/assignment-classroom/course/entities/course.entity';

export class CreateSubjectDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  readonly journey: Journey;
  @IsNotEmpty()
  readonly course: Course;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) { }
