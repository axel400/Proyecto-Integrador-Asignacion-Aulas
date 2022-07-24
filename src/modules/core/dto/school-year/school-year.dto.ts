import { IsNotEmpty, IsString, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';

export class CreateSchoolYearDto {
    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsString())
    readonly name: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly startDate: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly endDate: string;
}

export class UpdateSchoolYearDto extends PartialType(CreateSchoolYearDto) { }
