import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import {
  CareerEntity,
  LevelEntity,
  ParallelEntity,
  SchoolDayEntity,
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
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
