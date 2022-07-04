import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDayDto{
    @IsString()
    readonly name: string;
}

export class UpdateDayDto extends PartialType(CreateDayDto){}