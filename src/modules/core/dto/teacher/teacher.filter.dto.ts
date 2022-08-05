import { PaginationDto } from '@core/dto';
import { IsString, IsOptional } from 'class-validator';

export class FilterTeacherDto extends PaginationDto {
  @IsString({ message: 'El campo name debe ser un string' })
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly idCard: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly telephone: string;
}
