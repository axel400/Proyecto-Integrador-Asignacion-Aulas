import { DayEntity, StatusEntity } from '@core/entities';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty} from 'class-validator';

export class CreateScheduleDto{
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;

    @IsNotEmpty({ message: 'El campo date es obligatorio' })
    readonly date: string;

    @IsNotEmpty({ message: 'El campo startTime es obligatorio' })
    readonly startTime: string;

    @IsNotEmpty({ message: 'El campo endTime es obligatorio' })
    readonly endTime: string;

    @IsNotEmpty({ message: 'El campo day es obligatorio' })
    readonly day: DayEntity;

    @IsNotEmpty({ message: 'El campo status es obligatorio' })
    readonly status: StatusEntity;
}
export class UpdateScheduleDto extends PartialType(CreateScheduleDto){}