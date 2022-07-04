import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLevelDto{
    @IsString()
    readonly name: string;
}
export class UpdateLevelDto extends PartialType(CreateLevelDto){}