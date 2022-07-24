import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CareerEntity, SchoolDayEntity, } from '@core/entities';
import { messageIsNotEmpty } from '@shared/validation';

export class CreateTimeSettingDto {
  @IsNotEmpty(messageIsNotEmpty())
  readonly weeklyHours: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly career: CareerEntity;

  @IsNotEmpty(messageIsNotEmpty())
  readonly schoolDay: SchoolDayEntity;
}

export class UpdateTimeSettingDto extends PartialType(CreateTimeSettingDto) { }
