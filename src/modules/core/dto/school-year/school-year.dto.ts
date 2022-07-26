import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import { StateEntity } from '@core/entities';

export class CreateSchoolYearDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly startDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly endDate: string;

}

export class UpdateSchoolYearDto extends PartialType(CreateSchoolYearDto) {}
