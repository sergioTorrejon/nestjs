import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,

} from 'class-validator';
import { PaginateDto, SortDto } from 'src/common/dtos';
import { AuditDto } from 'src/common/dtos/audit.dto';
export class SeguimientoDto {

  @IsOptional()
  id_documento?: number=0;

  @IsOptional()
  @IsString()
  @MaxLength(50,{message:'La rc_tipo longitud no puede ser mayor a 2 caracteres'})
  accion?: string='';

  @IsOptional()
  @IsString()
  @MaxLength(10,{message:'La rc_inten longitud no puede ser menor a 2 caracteres y mayor a 100 caracteres'})
  etapa?: string='';

  @IsOptional()
  @IsString()
  @MaxLength(50,{message:'La rc_tipo longitud no puede ser mayor a 2 caracteres'})
  usuario?: string='';

  @IsOptional()
  @IsString()
  @MaxLength(500,{message:'La rc_tipo longitud no puede ser mayor a 500 caracteres'})
  observaciones?: string='';
  
}

export class SeguimientoBaseDto extends IntersectionType(
  SeguimientoDto,
  AuditDto,
) {}

export class SeguimientoSortDto extends IntersectionType(
  SeguimientoDto,
  SortDto,
) {}

export class SeguimientoPaginateDto extends IntersectionType(
  SeguimientoSortDto,
  PaginateDto,
) {}

export class SeguimientoSearchDto extends PartialType(
  OmitType(SeguimientoPaginateDto, [] as const),
) {}

export class SeguimientoCreateDto extends PartialType(
  OmitType(SeguimientoPaginateDto, [] as const),
) {}

export class SeguimientoUpdateDto extends PartialType(
  OmitType(SeguimientoPaginateDto, [] as const),
) {}

