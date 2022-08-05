import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterCourseDto extends PaginationDto {
    @IsOptional()
    readonly name: string;
}
