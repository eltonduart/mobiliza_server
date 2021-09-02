import Municipio from '@modules/municipios/infra/typeorm/entities/Municipio';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  // ManyToOne,
  // JoinColumn,
} from 'typeorm';

// import Street from '@modules/streets/infra/typeorm/entities/Street';

@Entity('distritos')
class Distrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  municipio_id: number;

  @ManyToOne(() => Municipio, municipio => municipio.id, { eager: true })
  @JoinColumn({ name: 'municipio_id' })
  municipio: Municipio;
}

export default Distrito;
