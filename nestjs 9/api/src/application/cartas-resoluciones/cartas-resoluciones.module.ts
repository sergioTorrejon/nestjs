import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalogos } from '../catalogos/entities';
import { Notificaciones } from '../notificaciones/entities/notificaciones.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Seguimiento } from '../seguimientos/entities';
import { SeguimientosService } from '../seguimientos/seguimientos.service';
import { CartasResolucionesController } from './cartas-resoluciones.controller';
import { CartasResolucionesService } from './cartas-resoluciones.service';
import { CartasResoluciones } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartasResoluciones,Notificaciones,Catalogos,Seguimiento])],
  controllers: [CartasResolucionesController],
  providers: [CartasResolucionesService, NotificacionesService, SeguimientosService],
})
export class CartasResolucionesModule {}
