import { PartialType } from '@nestjs/swagger';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCareerDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;
}

export class UpdateCareerDto extends PartialType(CreateCareerDto) {}