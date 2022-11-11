import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Notificados } from './entities';
import { NotificadosController } from './notificados.controller';
import { NotificadosService } from './notificados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notificados])],
  controllers: [NotificadosController],
  providers: [NotificadosService],
})
export class NotificadosModule {}
