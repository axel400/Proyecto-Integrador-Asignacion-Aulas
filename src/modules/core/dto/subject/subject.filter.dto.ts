import { PaginationDto } from '@core/dto';
import { IsString, IsOptional } from 'class-validator';

export class FilterSubjectDto extends PaginationDto {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly code: string;

  @IsOptional()
  readonly theoreticalHours: string;

  @IsOptional()
  readonly laboratoryHours: string;
}
