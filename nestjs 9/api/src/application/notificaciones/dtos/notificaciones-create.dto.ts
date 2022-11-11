import {
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
export class CreateNotificacionesDto {
  
  @IsNumber()
  rc_id: number;

  @IsString()
  t_ciudad: string;

  @IsString()
  t_fecha: Date;
  
  @IsString()
  t_hora: string; 
  
  @IsString()
  t_aquien: string;

  @IsString()
  t_atraves: string;

  @IsBoolean()
  estado: boolean;

}
