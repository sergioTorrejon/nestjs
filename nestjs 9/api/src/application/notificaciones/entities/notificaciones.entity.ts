import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notificaciones')
export class Notificaciones {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  rc_id: number;

  @Column({ type: 'varchar', length: 3 })
  t_ciudad: string;

  @Column()
  t_fecha: Date;
  
  @Column({ type: 'varchar', length: 5 })
  t_hora: string; 
  
  @Column({ type: 'varchar', length: 254 })
  t_aquien: string;

  @Column({ type: 'varchar', length: 254})
  t_atraves: string;

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