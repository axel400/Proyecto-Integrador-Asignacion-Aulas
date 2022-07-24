import { IsNotEmpty, IsString, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';

export class CreateSchoolDayDto {
    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsString())
    readonly name: string;
}

export class UpdateSchoolDayDto extends PartialType(CreateSchoolDayDto) { }
