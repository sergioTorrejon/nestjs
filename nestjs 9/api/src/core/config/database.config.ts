import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import * as dotenv from 'dotenv';

dotenv.config();

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    port: parseInt(process.env.DATABASE_PORT, 10),
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,
  
    // Implementaremos Migrations.
    /** Recursos
     *  * https://typeorm.io/#/migrations
     */
  
    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: true,
    logging: true,
    logger: 'file',

  }
}

export default registerAs('database', () => ({
  config: typeormModuleOptions()
}));
