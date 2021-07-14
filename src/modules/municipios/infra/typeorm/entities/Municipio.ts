import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// import Street from '@modules/streets/infra/typeorm/entities/Street';

@Entity('municipios')
class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cod_ibge: string;
}

export default Municipio;
