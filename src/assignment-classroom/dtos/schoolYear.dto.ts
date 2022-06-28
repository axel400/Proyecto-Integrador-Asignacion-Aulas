import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSchoolYearDto{
    @IsString()
    readonly name: string;
}

export class UpdateSchoolYearDto extends PartialType(CreateSchoolYearDto){}
