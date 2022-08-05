import { PaginationDto } from '@core/dto';
import { IsString, IsOptional } from 'class-validator';

export class FilterRequestDto extends PaginationDto {
  @IsOptional()
  readonly date: string;

  @IsOptional()
  readonly totalHoursRequested: string;

  @IsOptional()
  readonly startDate: string;

  @IsOptional()
  readonly endDate: string;
}
