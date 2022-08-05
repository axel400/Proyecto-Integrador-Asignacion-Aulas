import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import {
  CareerEntity,
  LevelEntity,
  ParallelEntity,
  SchoolDayEntity,
  TeacherEntity,
} from '@core/entities';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class CreateCourseDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly level: LevelEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly schoolDay: SchoolDayEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly parallel: ParallelEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly career: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tutor: TeacherEntity;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
