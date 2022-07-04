import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateScheduleDto{
    @IsString()
    readonly date: string;
    readonly startTime: string;
    readonly endTime: string;
}
export class UpdateScheduleDto extends PartialType(CreateScheduleDto){}