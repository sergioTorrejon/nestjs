import { Status } from 'src/common/helpers/params';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'simple-array' })
  role: string[];

  @Column({ type: 'varchar', length: 500 , nullable:true})
  nombre_completo: string;

  //AUDIT COLUMNS
  @Column({ type: 'varchar', length: 10 , default: Status.ACTIVO})
  status: string;

  @Column({ type: 'bool', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 50, default: 'SYSTEM' })
  usuario_creacion: string;

  @CreateDateColumn({type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'varchar', length: 50, default: 'SYSTEM' })
  usuario_modificacion: string;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_modificacion: Date;

}


