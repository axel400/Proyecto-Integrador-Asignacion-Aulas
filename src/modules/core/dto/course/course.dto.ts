import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CareerEntity, LevelEntity, ParallelEntity, SchoolDayEntity } from '@core/entities';
import { messageIsNotEmpty } from '@shared/validation';

export class CreateCourseDto {

    @IsNotEmpty(messageIsNotEmpty())
    readonly level: LevelEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly schoolDay: SchoolDayEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly parallel: ParallelEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly career: CareerEntity;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) { }
