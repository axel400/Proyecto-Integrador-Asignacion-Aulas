import { PaginationDto } from '@core/dto';
import { IsString, IsOptional } from 'class-validator';

export class FilterScheduleDto extends PaginationDto {
  @IsString({ message: 'El campo name debe ser un string' })
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly date: string;

  @IsOptional()
  readonly startTime: string;

  @IsOptional()
  readonly endTime: string;

  @IsOptional()
  readonly day: string;
}
