import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty } from '@shared/validation';
import { SchoolYearEntity } from '@core/entities';

export class CreateRequestDto {
    @IsNotEmpty(messageIsNotEmpty())
    readonly date: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly totalHoursRequested: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly career: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly schoolYear: SchoolYearEntity;
}
export class UpdateRequestDto extends PartialType(CreateRequestDto) { }