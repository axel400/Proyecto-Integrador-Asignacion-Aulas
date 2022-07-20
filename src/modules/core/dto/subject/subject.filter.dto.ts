import { PaginationDto } from '@core/dto';
import { IsString, IsOptional } from 'class-validator';

export class FilterSubjectDto extends PaginationDto {
  @IsString({ message: 'El campo name debe ser un string' })
  @IsOptional()
  readonly name: string;

  @IsString({ message: 'El campo description debe ser un string' })
  @IsOptional()
  readonly description: string;
}
