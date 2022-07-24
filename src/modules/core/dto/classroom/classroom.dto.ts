import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LocationEntity, } from '@core/entities';
import { messageIsNotEmpty, messageIsNumber, messageIsString } from '@shared/validation';

export class CreateClassroomDto {
    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsString())
    readonly name: string;

    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsNumber())
    readonly capacity: number;

    @IsNotEmpty(messageIsNotEmpty())
    readonly location: LocationEntity;
}

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) { }