import { PaginationDto } from '@core/dto';
import { IsString, IsOptional } from 'class-validator';

export class FilterRequestDto extends PaginationDto {
  @IsString({ message: 'El campo career debe ser un string' })
  @IsOptional()
  readonly career: string;

  @IsOptional()
  readonly date: string;

  @IsOptional()
  readonly totalHoursRequested: string;
}
