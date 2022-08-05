import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';

export class UpdateProfileDto extends PickType(UserDto, [
  'identification',
  'lastname',
  'name',
]) {}
