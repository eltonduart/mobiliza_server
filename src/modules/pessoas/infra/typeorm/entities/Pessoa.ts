import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
  // JoinColumn,
} from 'typeorm';

// import Street from '@modules/streets/infra/typeorm/entities/Street';

@Entity('pessoas')
class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  apelido: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column()
  dta_nascimento: Date;

  @Column()
  whatsapp: string;

  @Column()
  instagran: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  mae: string;

  @Column()
  facebook: string;

  @Column()
  titulo: string;

  @Column()
  zona_eleitoral: string;

  @Column()
  secao_eleitoral: string;

  @Column()
  tipo_usuario: string;

  @Column()
  status: string;

  @Column()
  municipio_id: number;

  @Column()
  owner_user_id: number;

  /* @Column()
  street_id: number;

  @ManyToOne(() => Street, street => street.id, { eager: true })
  @JoinColumn({ name: 'street_id' })
  street: Street; */

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pessoa;
