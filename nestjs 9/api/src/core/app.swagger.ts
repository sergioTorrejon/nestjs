import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .addBearerAuth()
    .setDescription(
      'AUTORIDAD DE FISCALIZACION Y CONTROL DE PENSIONES Y SEGUROS - Sistema de Registro de Documentos y Resoluciones',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
