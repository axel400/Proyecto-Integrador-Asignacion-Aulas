import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';

export class CreateStateDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;
}

export class UpdateStateDto extends PartialType(CreateStateDto) {}
