import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CareerEntity, TeacherEntity } from '@core/entities';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';

export class CreateSubjectDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly code: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly theoreticalHours: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly laboratoryHours: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly teacher: TeacherEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly career: CareerEntity;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
