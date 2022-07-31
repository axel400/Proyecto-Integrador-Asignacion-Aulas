import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import {
  CourseEntity,
  SchoolYearEntity,
  SubjectEntity,
  TeacherEntity,
} from '@core/entities';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class CreateTeacherDistributionDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly schoolYear: SchoolYearEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subject: SubjectEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly course: CourseEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly teacher: TeacherEntity;
}

export class UpdateTeacherDistributionDto extends PartialType(
  CreateTeacherDistributionDto,
) {}
