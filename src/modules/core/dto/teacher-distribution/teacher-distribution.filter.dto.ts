import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterTeacherDistributionDto extends PaginationDto {
    @IsOptional()
    readonly name: string;
}
