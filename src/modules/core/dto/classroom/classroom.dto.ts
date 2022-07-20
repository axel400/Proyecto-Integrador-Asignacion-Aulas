import {IsString,IsNotEmpty} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { StatusEntity } from '@core/entities';

export class CreateClassroomDto{
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;

    @IsNotEmpty({ message: 'El campo status es obligatorio' })
    readonly status: StatusEntity;
}

export class UpdateClassroomDto extends PartialType(CreateClassroomDto){}