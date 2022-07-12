import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateJourneyDto{
    @IsString()
    readonly name: string;
}
export class UpdateJourneyDto extends PartialType(CreateJourneyDto){}