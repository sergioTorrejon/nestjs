/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtConsultaRoleGuard } from 'src/core/auth/guards/jwt-consulta-role.guard';
import { JwtOperadorRoleGuard } from 'src/core/auth/guards/jwt-operador-role.guard';
import { NotificacionesService } from './notificaciones.service';
@ApiTags('Notificaciones')
@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly notificacionesService: NotificacionesService,
  ) {}

  @UseGuards(JwtConsultaRoleGuard)   
  @Get('getNotificaciones/:rc_id')
  async getNotificacionesbyId(@Param('rc_id', ParseIntPipe) rc_id: number) {
    const data = await this.notificacionesService.getbyIdResoluciones(rc_id);
    return { data };
  }

  @UseGuards(JwtOperadorRoleGuard)
  @Delete(':id')
  async deleteOne(@Req() request,@Param('id') id: number) {
    const dto = await this.notificacionesService.getById(id);
    dto.estado = false;
    dto.usuario_modificacion = request.user.username;
    const data = await this.notificacionesService.deleteOne(dto);

    return { message: 'Post deleted', data };
  }
}
