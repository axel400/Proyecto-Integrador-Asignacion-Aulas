import { ClassroomEntity, ScheduleEntity, TeacherCareerSubjectEntity } from '@core/entities';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneralScheduleDto {
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;
    
    @IsNotEmpty({ message: 'El campo classroom es obligatorio' })
    readonly classroom: ClassroomEntity;

    @IsNotEmpty({ message: 'El campo schedule es obligatorio' })
    readonly schedule: ScheduleEntity;

    @IsNotEmpty({ message: 'El campo teacherCareerSubject es obligatorio' })
    readonly teacherCareerSubject:TeacherCareerSubjectEntity ;
}

export class UpdateGeneralScheduleDto extends PartialType(CreateGeneralScheduleDto) { }
