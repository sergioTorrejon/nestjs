import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsArray,
  IsEnum,

} from 'class-validator';
import { PaginateDto, SortDto } from 'src/common/dtos';
import { AuditDto } from 'src/common/dtos/audit.dto';
import { EnumToString } from 'src/common/helpers/enumToString';
import { Role } from 'src/common/helpers/params';
export class UsuarioDto {
  @IsOptional()
  @IsString()
  @MaxLength(50,{message:'La longitud de username no puede ser mayor a 50 caracteres'})
  username?: string='';

  @IsArray()
  @IsEnum(Role, {
    each: true,
    message: `must be a valid role value, ${EnumToString(Role)}`,
  })
  role: string[];
  
  @IsOptional()
  @IsString()
  @MaxLength(500,{message:'La longitud de nombre completo no puede ser mayor a 500 caracteres'})
  nombre_completo?: string='';

  @IsOptional()
  @IsString()
  status?: string='ACTIVO';

  @IsOptional()
  @IsBoolean()
  estado?: boolean=true;

}

export class UsuarioBaseDto extends IntersectionType(
  UsuarioDto,
  AuditDto,
) {}

export class UsuarioSortDto extends IntersectionType(
  UsuarioBaseDto,
  SortDto,
) {}

export class UsuarioPaginateDto extends IntersectionType(
  UsuarioSortDto,
  PaginateDto,
) {}

export class UsuarioSearchDto extends PartialType(
  OmitType(UsuarioPaginateDto, [] as const),
) {}

export class UsuarioCreateDto extends PartialType(
  OmitType(UsuarioBaseDto, ['usuario_modificacion'] as const),
) {}

export class UsuarioUpdateDto extends PartialType(
  OmitType(UsuarioBaseDto, ['usuario_creacion'] as const),
) {}

