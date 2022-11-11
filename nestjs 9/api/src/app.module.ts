import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONFIG } from './core/config/constants';
import databaseConfig from './core/config/database.config';
import { AuthModule } from './core/auth/auth.module';
import { CartasResolucionesModule } from './application/cartas-resoluciones/cartas-resoluciones.module';
import { NotificacionesModule } from './application/notificaciones/notificaciones.module';
import { CatalogosModule } from './application/catalogos/catalogos.module';
import { NotificadosModule } from './application/notificados/notificados.module';
import { UsuariosModule } from './application/usuarios/usuarios.module';
import { SeguimientosModule } from './application/seguimientos/seguimientos.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({ 
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
      }),
    }),
    AuthModule,
    CartasResolucionesModule,
    NotificacionesModule,
    NotificadosModule,
    CatalogosModule,
    UsuariosModule,
    SeguimientosModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
