import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterScheduleConfigurationDto extends PaginationDto {
  @IsOptional()
  readonly date: string;
}
