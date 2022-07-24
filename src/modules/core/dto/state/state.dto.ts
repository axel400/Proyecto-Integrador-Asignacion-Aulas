import { IsNotEmpty, IsString, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';

export class CreateStateDto {
    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsString())
    readonly name: string;
}

export class UpdateStateDto extends PartialType(CreateStateDto) { }
