import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterSchedulePositionDto extends PaginationDto {
  @IsOptional()
  readonly code: string;
}
