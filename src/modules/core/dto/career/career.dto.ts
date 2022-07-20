import { SchoolYearEntity } from '@core/entities';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCareerDto {
    @IsNotEmpty({ message: 'El campo name es obligatorio' })
    @IsString({ message: 'El campo name debe ser un string' })
    readonly name: string;

    @IsNotEmpty({ message: 'El campo schoolYear es obligatorio' })
    readonly schoolYear: SchoolYearEntity;
}
