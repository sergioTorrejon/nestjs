import {
  IsOptional,
  IsString,
} from 'class-validator';


export class SortDto {
 
  @IsOptional()
  @IsString()
  sort?: string='id';

  @IsOptional()
  @IsString()
  order?: string='DESC';

}