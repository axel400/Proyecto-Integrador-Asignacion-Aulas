import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty } from '@shared/validation';

export class CreateSchedulePositionDto {
    @IsNotEmpty(messageIsNotEmpty())
    readonly code: string;
}
export class UpdateSchedulePositionDto extends PartialType(CreateSchedulePositionDto) { }