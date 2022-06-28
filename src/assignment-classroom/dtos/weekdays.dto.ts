import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateWeekDayDto{
    @IsString()
    readonly name: string;
}

export class UpdateWeekDayDto extends PartialType(CreateWeekDayDto){}
