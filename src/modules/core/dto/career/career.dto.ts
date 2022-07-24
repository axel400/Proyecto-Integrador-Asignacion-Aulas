import { PartialType } from '@nestjs/swagger';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCareerDto {
    @IsNotEmpty(messageIsNotEmpty())
    @IsString(messageIsString())
    readonly name: string;
}
export class UpdateCareerDto extends PartialType(CreateCareerDto) { }