import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterHourDto extends PaginationDto {
  @IsOptional()
  readonly hour: string;
}
