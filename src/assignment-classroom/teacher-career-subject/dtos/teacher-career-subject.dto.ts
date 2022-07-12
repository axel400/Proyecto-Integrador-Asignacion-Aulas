import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Career } from 'src/assignment-classroom/career/entities/career.entity';
import { Subject } from 'src/assignment-classroom/subject/entities/subject.entity';
import { Teacher } from 'src/assignment-classroom/teacher/entities/teacher.entity';
export class CreateTeacherCareerSubjectDto {
    @IsNotEmpty()
    readonly teacher: Teacher;

    @IsNotEmpty()
    readonly career: Career;
    
    @IsNotEmpty()
    readonly subject: Subject;
}

export class UpdateTeacherCareerSubjectDto extends PartialType(CreateTeacherCareerSubjectDto) { }