import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty } from '@shared/validation';
import { ClassroomEntity, ColorEntity, DayEntity, HourEntity, StateEntity, TeacherDistributionEntity } from '@core/entities';

export class CreateScheduleConfigurationDto {
    @IsNotEmpty(messageIsNotEmpty())
    readonly date: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly color: ColorEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly day: DayEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly hour: HourEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly classroom: ClassroomEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly state: StateEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly teacherDistribution: TeacherDistributionEntity;
}
export class UpdateScheduleConfigurationDto extends PartialType(CreateScheduleConfigurationDto) { }