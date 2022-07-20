import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo idCard es obligatorio' })
  readonly idCard: string;

  @IsNotEmpty({ message: 'El campo name es obligatorio' })
  @IsString({ message: 'El campo name debe ser un string' })
  readonly name: string;
  
  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsEmail({ message: 'El campo email debe ser un correo valido' })
  readonly email: string;

  @IsNotEmpty({ message: 'El campo telephone es obligatorio' })
  readonly telephone: string;
}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
