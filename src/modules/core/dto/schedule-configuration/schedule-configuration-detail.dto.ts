import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions } from '@shared/validation';
import {
  ClassroomEntity,
  ColorEntity,
  DayEntity,
  HourEntity,
  RequestEntity,
  StateEntity,
} from '@core/entities';

export class CreateScheduleConfigurationDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly date: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly color: ColorEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly day: DayEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly hour: HourEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly classroom: ClassroomEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly request: RequestEntity;
}
export class UpdateScheduleConfigurationDto extends PartialType(
  CreateScheduleConfigurationDto,
) {}
