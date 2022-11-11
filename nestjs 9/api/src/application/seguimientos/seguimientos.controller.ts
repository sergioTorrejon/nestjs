/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtOperadorRoleGuard } from 'src/core/auth/guards/jwt-operador-role.guard';
import { SeguimientosService } from './seguimientos.service';
import { SeguimientoSearchDto } from './dtos/seguimientos.dto';
@ApiTags('Seguimiento')
@Controller('seguimiento')
export class SeguimientosController {
  constructor(
    private readonly service: SeguimientosService,
  ) {}

  //#region CRUD
  //---------------GET DATA PAGINATE------------//
   @Get()
  async getPaginate(@Query() dto: SeguimientoSearchDto) {
      return await this.service.getPaginate(dto) 
  }

  @Get(':id')
  async getDatabyId(@Param('id', ParseIntPipe) id: number) {
      
      return await this.service.getByIdDoc(id) 
  }
   
//#endregion


}
