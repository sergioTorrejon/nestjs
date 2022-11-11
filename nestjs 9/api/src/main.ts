import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initSwagger } from './core/app.swagger';
import { SERVER_PORT } from './core/config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  initSwagger(app);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
