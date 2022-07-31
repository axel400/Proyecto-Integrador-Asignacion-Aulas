import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { CareerEntity, CourseEntity, SchoolYearEntity, StateEntity, SubjectEntity, TeacherEntity } from '@core/entities';

export class CreateRequestDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly date: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly totalHoursRequested: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly startDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly endDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly schoolYear: SchoolYearEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly career: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly teacher: TeacherEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly course: CourseEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subject: SubjectEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}
export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
