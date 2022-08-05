import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CareerEntity, SchoolDayEntity } from '@core/entities';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class CreateTimeSettingDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly weeklyHours: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly hoursUsed: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly hoursAvailable: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly career: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly schoolDay: SchoolDayEntity;
}

export class UpdateTimeSettingDto extends PartialType(CreateTimeSettingDto) {}
