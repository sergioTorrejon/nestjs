import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notificados')
export class Notificados {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 254 })
  descripcion: string;
  
  @Column({ type: 'bool', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario_creacion: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario_modificacion: string;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fecha_modificacion: Date;
}