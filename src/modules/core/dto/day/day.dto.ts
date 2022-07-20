import {IsNotEmpty, IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDayDto{
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;
}

export class UpdateDayDto extends PartialType(CreateDayDto){}