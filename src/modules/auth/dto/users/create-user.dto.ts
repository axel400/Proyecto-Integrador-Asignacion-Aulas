import {
  IsString,
  IsBoolean,
  IsPositive,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsDate,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsDate({ message: 'El campo birthdate debe ser una fecha válida' })
  readonly birthdate: Date;

  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsEmail({ message: 'El campo email debe ser un correo electrónico' })
  readonly email: string;

  @IsNotEmpty({ message: 'El campo lastname es obligatorio' })
  @IsString({ message: 'El campo lastname debe ser un string' })
  readonly lastname: string;

  @IsNotEmpty({ message: 'El campo password es obligatorio' })
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly passwordChanged: boolean;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  readonly roles: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly username: string;
}
