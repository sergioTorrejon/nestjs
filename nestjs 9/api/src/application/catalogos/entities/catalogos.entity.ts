import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('catalogos')
export class Catalogos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 3 })
  cod_tab: string;

  @Column({ type: 'varchar', length: 5 })
  cod_ele: string;

  @Column({ type: 'varchar', length: 100 })
  descrip: string;

  @Column({ type: 'varchar', length: 3 , nullable: true})
  cod_superior: string;
}


