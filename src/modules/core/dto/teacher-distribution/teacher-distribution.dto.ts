import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CourseEntity, SchoolDayEntity, SubjectEntity, TeacherEntity, } from '@core/entities';
import { messageIsNotEmpty } from '@shared/validation';

export class CreateTeacherDistributionDto {
  @IsNotEmpty(messageIsNotEmpty())
  readonly schoolDay: SchoolDayEntity;

  @IsNotEmpty(messageIsNotEmpty())
  readonly subject: SubjectEntity;

  @IsNotEmpty(messageIsNotEmpty())
  readonly course: CourseEntity;

  @IsNotEmpty(messageIsNotEmpty())
  readonly teacher: TeacherEntity;
}

export class UpdateTeacherDistributionDto extends PartialType(CreateTeacherDistributionDto) { }
