import {
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCatalogosDto {
  @IsString()
  cod_tab: string;

  @IsString()
  cod_ele: string;

  @IsString()
  descrip: string;

  @IsOptional()
  @IsString()
  cod_superior: string;
}


