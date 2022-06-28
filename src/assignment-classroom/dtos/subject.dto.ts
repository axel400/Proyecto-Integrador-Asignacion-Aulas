import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSubjectDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
