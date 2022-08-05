import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class CreateSchedulePositionDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly code: string;
}
export class UpdateSchedulePositionDto extends PartialType(
  CreateSchedulePositionDto,
) {}
