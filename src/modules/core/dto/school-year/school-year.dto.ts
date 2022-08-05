import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import { StateEntity } from '@core/entities';

export class CreateSchoolYearDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly startDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly endDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}

export class UpdateSchoolYearDto extends PartialType(CreateSchoolYearDto) {}
