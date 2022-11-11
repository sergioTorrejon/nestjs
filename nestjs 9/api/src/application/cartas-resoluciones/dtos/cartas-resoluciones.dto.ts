import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,

} from 'class-validator';
import { PaginateDto, SortDto } from 'src/common/dtos';
export class CartasResolucionesDto {
  @IsOptional()
  @IsString()
  @MaxLength(5,{message:'La rc_inten longitud no puede ser menor a 2 caracteres y mayor a 100 caracteres'})
  rc_inten?: string='';

  @IsOptional()
  @IsString()
  @MaxLength(2,{message:'La rc_tipo longitud no puede ser mayor a 2 caracteres'})
  rc_tipo?: string='';
  
  @IsOptional()
  @IsString()
  @MaxLength(4,{message:'La rc_numero longitud debe ser de 4 caracteres'})
  rc_numero?: string='';

  @IsOptional()
  rc_year?: number=0;

  @IsOptional()
  @IsString()
  @MaxLength(1,{message:'La rc_alfa longitud no puede mayor a 1 caracter'})
  rc_alfa?: string='';

  @IsOptional()
  @IsString()
  rc_fecha?: string='';

  @IsOptional()
  @IsString()
  @MaxLength(1000,{message:'La longitud rc_titulo no puede ser menor a 2 caracteres y mayor a 1000 caracteres'})
  rc_titulo?: string='';

  @IsOptional()
  @IsString()
  @MaxLength(2000,{message:'La longitud rc_comentarios no puede ser menor a 2 caracteres y mayor a 2000 caracteres'})
  rc_comentarios?: string='';

  @IsOptional()
  @IsString()
  rc_filesize: number;

  @IsOptional()
  @IsString()
  @MaxLength(200,{message:'La longitud del FileName no puede ser menor a 2 caracteres y mayor a 200 caracteres'})
  rc_filename?: string='';

  @IsOptional()
  @IsString()
  rc_mercado?: string='';

  @IsOptional()
  @IsString()
  rc_subtipo?: string='';

  @IsOptional()
  @IsBoolean()
  rc_publicar_web?: boolean;

  @IsOptional()
  @IsString()
  etapa?: string='';

  @IsOptional()
  @IsString()
  notificaciones?: string='';

  @IsOptional()
  id_seguimiento?: number=0;

  @IsOptional()
  @IsBoolean()
  estado?: boolean=true;

  @IsOptional()
  @IsString()
  del?: string='';

  @IsOptional()
  @IsString()
  al?: string='';

  @IsOptional()
  @IsString()
  modulo?: string='';

  @IsOptional()
  @IsString()
  usuario?: string='';

  @IsOptional()
  @IsString()
  observaciones?: string='';

  @IsString()
  derivado?: string='';

  @IsOptional()
  @IsString()
  user?: string='';

  @IsOptional()
  @IsString()
  role?: string='';

}


export class CartasResolucionesSortDto extends IntersectionType(
  CartasResolucionesDto,
  SortDto,
) {}

export class CartasResolucionesPaginateDto extends IntersectionType(
  CartasResolucionesSortDto,
  PaginateDto,
) {}

export class CartasResolucionesSearchDto extends PartialType(
  OmitType(CartasResolucionesPaginateDto, [] as const),
) {}

export class CartasResolucionesCreateDto extends PartialType(
  OmitType(CartasResolucionesPaginateDto, ['rc_fecha'] as const),
) {
  @IsOptional()
  rc_fecha: Date;

  @IsOptional()
  file: string;
}

export class CartasResolucionesUpdateDto extends PartialType(
  OmitType(CartasResolucionesPaginateDto, ['rc_fecha'] as const),
) {
  @IsOptional()
  rc_fecha: Date;

  @IsOptional()
  file: string;
}

