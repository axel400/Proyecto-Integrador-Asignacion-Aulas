import { SchedulePositionEntity } from '@core/entities';
import { PartialType } from '@nestjs/swagger';
import { messageIsNotEmpty } from '@shared/validation';
import { IsNotEmpty } from 'class-validator';

export class CreateHourDto {
    @IsNotEmpty(messageIsNotEmpty())
    readonly hour: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly schedulePosition: SchedulePositionEntity;
}
export class UpdateHourDto extends PartialType(CreateHourDto) { }