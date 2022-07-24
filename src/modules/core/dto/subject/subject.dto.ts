import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CareerEntity, } from '@core/entities';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';

export class CreateSubjectDto {
  @IsNotEmpty(messageIsNotEmpty())
  readonly code: string;

  @IsNotEmpty(messageIsNotEmpty())
  @IsString(messageIsString())
  readonly name: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly theoreticalHours: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly practicalHours: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly career: CareerEntity;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) { }
