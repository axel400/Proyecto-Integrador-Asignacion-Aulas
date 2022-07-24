import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty } from '@shared/validation';
import { RequestEntity, StateEntity, TeacherDistributionEntity } from '@core/entities';

export class CreateRequestDetailDto {
    @IsNotEmpty(messageIsNotEmpty())
    readonly startDate: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly endDate: string;

    @IsNotEmpty(messageIsNotEmpty())
    readonly request: RequestEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly teacherDistribution: TeacherDistributionEntity;

    @IsNotEmpty(messageIsNotEmpty())
    readonly state: StateEntity;
}
export class UpdateRequestDetailDto extends PartialType(CreateRequestDetailDto) { }