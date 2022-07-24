import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterRequestDetailDto extends PaginationDto {
  @IsOptional()
  readonly startDate: string;

  @IsOptional()
  readonly endDate: string;
}
