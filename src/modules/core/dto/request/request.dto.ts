import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { CareerEntity, StateEntity, TeacherDistributionEntity } from '@core/entities';

export class CreateRequestDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly date: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly totalHoursRequested: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly startDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly endDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly career: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly teacherDistribution: TeacherDistributionEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}
export class UpdateRequestDto extends PartialType(CreateRequestDto) { }
