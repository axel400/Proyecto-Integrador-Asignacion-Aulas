import { IsNotEmpty, IsString, } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';

export class CreateLocationDto {
    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsString())
    readonly buildingName: string;
}
export class UpdateLocationDto extends PartialType(CreateLocationDto) { }