import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTeacherDto {
  @IsString()
  readonly idCard: string;
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsPhoneNumber()
  readonly telephone: string;
}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
