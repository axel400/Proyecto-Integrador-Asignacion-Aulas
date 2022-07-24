import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { messageIsNotEmpty, messageIsString } from '@shared/validation';
import { StateEntity } from '@core/entities';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty(messageIsNotEmpty())
  readonly idCard: string;

  @IsNotEmpty(messageIsNotEmpty())
  @IsString(messageIsString())
  readonly name: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly email: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly telephone: string;

  @IsNotEmpty(messageIsNotEmpty())
  readonly state: StateEntity;
}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) { }
