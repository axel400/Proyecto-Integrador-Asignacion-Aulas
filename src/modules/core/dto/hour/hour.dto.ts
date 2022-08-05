import { SchedulePositionEntity, StateEntity } from '@core/entities';
import { PartialType } from '@nestjs/swagger';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { IsNotEmpty } from 'class-validator';

export class CreateHourDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly hour: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly schedulePosition: SchedulePositionEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}
export class UpdateHourDto extends PartialType(CreateHourDto) {}
