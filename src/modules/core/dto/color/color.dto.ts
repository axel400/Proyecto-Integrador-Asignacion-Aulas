import { PartialType } from '@nestjs/swagger';
import { messageIsNotEmpty } from '@shared/validation';
import { IsNotEmpty } from 'class-validator';

export class CreateColorDto {
    @IsNotEmpty(messageIsNotEmpty())
    readonly code: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly image: string;
}
export class UpdateColorDto extends PartialType(CreateColorDto) { }