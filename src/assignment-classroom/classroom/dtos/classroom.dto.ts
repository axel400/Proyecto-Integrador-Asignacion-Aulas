import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateClassroomDto{
    @IsString()
    readonly name: string;
}

export class UpdateClassroomDto extends PartialType(CreateClassroomDto){}