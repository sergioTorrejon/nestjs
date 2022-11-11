import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CatalogosController } from './catalogos.controller';
import { CatalogosService } from './catalogos.service';
import { Catalogos } from './entities/catalogos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Catalogos,Usuario])],
  controllers: [CatalogosController],
  providers: [CatalogosService, UsuariosService],
})
export class CatalogosModule {}
