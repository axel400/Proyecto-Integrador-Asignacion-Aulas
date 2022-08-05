import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterColorDto extends PaginationDto {
  @IsOptional()
  readonly code: string;

  @IsOptional()
  readonly image: string;
}
