import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import { StateEntity } from '@core/entities';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly idCard: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly email: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly telephone: string;
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
