import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seguimiento } from './entities/seguimientos.entity';
import { SeguimientosController } from './seguimientos.controller';
import { SeguimientosService } from './seguimientos.service';


@Module({
  imports: [TypeOrmModule.forFeature([Seguimiento])],
  controllers: [SeguimientosController],
  providers: [SeguimientosService],
})
export class SeguimientosModule {}
