import {
  IsString,
} from 'class-validator';

export class CreateNotificadosDto {
  @IsString()
  descripcion: string;
}
