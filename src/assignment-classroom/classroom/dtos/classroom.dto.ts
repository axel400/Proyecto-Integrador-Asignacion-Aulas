import {IsString,IsNotEmpty} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Status } from 'src/assignment-classroom/status/entities/status.entity';

export class CreateClassroomDto{
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    readonly status: Status;
}

export class UpdateClassroomDto extends PartialType(CreateClassroomDto){}