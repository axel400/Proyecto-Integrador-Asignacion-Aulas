import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Level } from 'src/assignment-classroom/level/entities/level.entity';

export class CreateCourseDto {

    @IsString()
    readonly name: string;

    @IsNotEmpty()
    readonly level: Level;

}

export class UpdateCourseDto extends PartialType(CreateCourseDto) { }
