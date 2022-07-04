import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCourseDto{
    @IsString()
    readonly name: string;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto){}
