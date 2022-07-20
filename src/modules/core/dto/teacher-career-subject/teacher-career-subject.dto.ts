import { CareerEntity, SubjectEntity, TeacherEntity } from '@core/entities';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherCareerSubjectDto {
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;
    
    @IsNotEmpty({ message: 'El campo teacher es obligatorio' })
    readonly teacher: TeacherEntity;

    @IsNotEmpty({ message: 'El campo career es obligatorio' })
    readonly career: CareerEntity;
    
    @IsNotEmpty({ message: 'El campo subject es obligatorio' })
    readonly subject: SubjectEntity;
}

export class UpdateTeacherCareerSubjectDto extends PartialType(CreateTeacherCareerSubjectDto) { }