import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty} from 'class-validator';
import { Day } from 'src/assignment-classroom/day/entities/day.entity';
import { Status } from 'src/assignment-classroom/status/entities/status.entity';

export class CreateScheduleDto{
    @IsString()
    readonly date: string;
    readonly startTime: string;
    readonly endTime: string;
    @IsNotEmpty()
    readonly day: Day;
    @IsNotEmpty()
    readonly status: Status;
}
export class UpdateScheduleDto extends PartialType(CreateScheduleDto){}