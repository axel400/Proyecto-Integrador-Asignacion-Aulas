import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LocationEntity, StateEntity } from '@core/entities';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';

export class CreateClassroomDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly capacity: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly location: LocationEntity;
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {}
