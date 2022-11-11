import {
  IsOptional,
  IsString,
} from 'class-validator';


export class PaginateDto {
 
  @IsOptional()
  @IsString()
  page?: string='1';

  @IsOptional()
  @IsString()
  limit?: string='10';

}