import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LevelEntity } from '@core/entities';

export class CreateCourseDto {
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;

    @IsNotEmpty({ message: 'El campo level es obligatorio' })
    readonly level: LevelEntity;

}

export class UpdateCourseDto extends PartialType(CreateCourseDto) { }
