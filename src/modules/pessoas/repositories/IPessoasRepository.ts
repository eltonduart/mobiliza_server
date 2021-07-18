import Pessoa from '../infra/typeorm/entities/Pessoa';
import ICreatePessoaDTO from '../dtos/ICreatePessoaDTO';
import IUpdatePessoaDTO from '../dtos/IUpdatePessoaDTO';

export default interface IPessoasRepository {
  findAll(query?: any, owner_user_id?: string): Promise<Pessoa[]>;
  findOne(nome: string): Promise<Pessoa | undefined>;
  findById(id: number): Promise<Pessoa | undefined>;
  findByField(field: string, value: any): Promise<Pessoa | undefined>;
  create(pessoaData: ICreatePessoaDTO): Promise<Pessoa>;
  save(pessoa: IUpdatePessoaDTO): Promise<Pessoa>;
  remove(id: number): Promise<void>;
  findByOwner(owner_user_id: string): Promise<Pessoa[]>;
}
