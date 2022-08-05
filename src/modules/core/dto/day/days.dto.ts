import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';

export class CreateDayDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;
}

export class UpdateDayDto extends PartialType(CreateDayDto) {}
