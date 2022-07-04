import {IsString,} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStatusDto{
    @IsString()
    readonly name: string;
}

export class UpdateStatusDto extends PartialType(CreateStatusDto){}
