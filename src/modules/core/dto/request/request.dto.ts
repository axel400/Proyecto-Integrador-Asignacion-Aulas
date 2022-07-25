import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { SchoolYearEntity } from '@core/entities';

export class CreateRequestDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly date: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly totalHoursRequested: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly career: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly schoolYear: SchoolYearEntity;
}
export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
