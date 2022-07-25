import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { isNotEmptyValidationOptions } from '@shared/validation';
import {
  RequestEntity,
  StateEntity,
  TeacherDistributionEntity,
} from '@core/entities';

export class CreateRequestDetailDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly startDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly endDate: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly request: RequestEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly teacherDistribution: TeacherDistributionEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: StateEntity;
}
export class UpdateRequestDetailDto extends PartialType(
  CreateRequestDetailDto,
) {}
