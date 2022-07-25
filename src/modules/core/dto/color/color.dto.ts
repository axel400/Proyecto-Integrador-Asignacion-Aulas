import { PartialType } from '@nestjs/swagger';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly code: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly image: string;
}
export class UpdateColorDto extends PartialType(CreateColorDto) {}
