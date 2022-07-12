import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Classroom } from 'src/assignment-classroom/classroom/entities/classroom.entity';
import { Schedule } from 'src/assignment-classroom/schedule/entities/schedule.entity';

export class CreateGeneralScheduleDto {
    @IsNotEmpty()
    readonly classroom: Classroom;

    @IsNotEmpty()
    readonly schedule: Schedule;
}

export class UpdateGeneralScheduleDto extends PartialType(CreateGeneralScheduleDto) { }
