import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';


export class AuditDto {
 
  @IsOptional()
  @IsBoolean()
  estado?: boolean=true;

  @IsOptional()
  @IsBoolean()
  activo?: boolean=true;

  @IsOptional()
  fecha_creacion?: Date;

  @IsOptional()
  @IsString()
  usuario_creacion?: string='SYSTEM';

  @IsOptional()
  @IsString()
  usuario_modificacion?: string='SYSTEM';

  @IsOptional()
  fecha_modificacion?: Date;

}