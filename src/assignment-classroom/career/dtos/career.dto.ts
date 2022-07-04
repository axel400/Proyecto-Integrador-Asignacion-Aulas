import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCareerDto{
    @IsString()
    readonly name: string;
}

export class UpdateCareerDto extends PartialType(CreateCareerDto){}