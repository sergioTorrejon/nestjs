import { Accion, Status } from 'src/common/helpers/params';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('seguimiento')
export class Seguimiento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_documento: number;

  @Column({ type: 'varchar', length: 50 , default: Accion.CREADO})
  accion: string;

  @Column({ type: 'varchar', length: 50 , default: Status.CREADO})
  etapa: string;

  @Column({ type: 'varchar', length: 50 , default: ''})
  observaciones: string;

  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario: string;

  @CreateDateColumn({name:'fecha_creacion',type: 'timestamp' })
  fechaCreacion: Date;

}


