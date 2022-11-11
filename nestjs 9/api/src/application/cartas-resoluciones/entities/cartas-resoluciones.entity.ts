import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cartas_resoluciones')
export class CartasResoluciones {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 5 })
  rc_inten: string;

  @Column({ type: 'varchar', length: 2 })
  rc_tipo: string;

  @Column({ type: 'varchar', length: 4 })
  rc_numero: string;

  @Column()
  rc_year: number;

  @Column({ type: 'varchar', length: 1 , default: ''})
  rc_alfa: string; 

  @Column()
  rc_fecha: Date;

  @Column({ type: 'text'})
  rc_titulo: string;

  @Column({ type: 'text' })
  rc_comentarios: string;

  @Column({type:"float", scale:2, default: 0})
  rc_filesize: number;

  @Column({ type: 'varchar', length: 100 , default: '', nullable: true})
  rc_filename: string;

  @Column({ type: 'varchar', length: 3 , nullable: true})
  rc_mercado: string;

  @Column({ type: 'varchar', length: 5 , default: '', nullable: true})
  rc_subtipo: string;

  @Column({ type: 'bool', default: true })
  rc_publicar_web: boolean;
  
  @Column({ default: 0})
  id_seguimiento: number;

  //AUDIT COLUMNS
  @Column({ type: 'bool', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario_creacion: string;

  @CreateDateColumn({type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario_modificacion: string;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_modificacion: Date;

}