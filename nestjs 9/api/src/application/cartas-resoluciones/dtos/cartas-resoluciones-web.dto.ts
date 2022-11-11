import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,


} from 'class-validator';
export class CartasResolucionesWebDto {
  @IsOptional()
  gestion?: number=0;

  @IsOptional()
  @IsString()
  institucion?: string='';

  @IsOptional()
  @IsString()
  mercado?: string='';
  
  @IsOptional()
  @IsString()
  tipoDocumento?: string='';

  @IsOptional()
  @IsString()
  categoria?: string='';
  
  @IsOptional()
  @IsString()
  titulo?: string='';

  @IsOptional()
  @IsString()
  numero?: string='';

  @IsOptional()
  @IsString()
  pagenumber?: string='1';

  @IsOptional()
  @IsString()
  itemsPerPage?: string='10';

}
