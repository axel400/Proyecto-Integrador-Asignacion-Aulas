import {IsString,IsNotEmpty} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { SchoolYear } from 'src/assignment-classroom/school-year/entities/school-year.entity';

export class CreateCareerDto{
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    readonly schoolYear: SchoolYear;
}

export class UpdateCareerDto extends PartialType(CreateCareerDto){}