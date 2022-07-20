import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CourseEntity, JourneyEntity } from '@core/entities';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'El campo name es obligatorio' })
  @IsString({ message: 'El campo name debe ser un string' })
  readonly name: string;

  @IsNotEmpty({ message: 'El campo description es obligatorio' })
  @IsString({ message: 'El campo description debe ser un string' })
  readonly description: string;

  @IsNotEmpty({ message: 'El campo journey es obligatorio' })
  readonly journey: JourneyEntity;

  @IsNotEmpty({ message: 'El campo course es obligatorio' })
  readonly course: CourseEntity;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) { }
