/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificadosService } from './notificados.service';
import { JwtOperadorRoleGuard } from 'src/core/auth/guards/jwt-operador-role.guard';
import { JwtConsultaRoleGuard } from 'src/core/auth/guards/jwt-consulta-role.guard';


@ApiTags('Notificados')
@Controller('notificados')
export class NotificadosController {
  constructor(
    private readonly notificadosService: NotificadosService,
  ) {}

  //---------------GET DATA PAGINATE------------//
  @UseGuards(JwtConsultaRoleGuard)
  @Get()
  async GetData
  (@Query('descripcion') descripcion: string = ''){
    const data = this.notificadosService.getDataFilter(descripcion);
    return data;
  }

  @UseGuards(JwtOperadorRoleGuard)
  @Post()
  async createPost(@Req() request,@Body() dto) {
    dto.usuario_creacion = request.user.username;
    const data = await this.notificadosService.createOne(dto);
    return { message: 'Notifaco Creado', data };
  }

}
