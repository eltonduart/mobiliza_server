import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
import ICreatePessoaDTO from '@modules/pessoas/dtos/ICreatePessoaDTO';
import IUpdatePessoaDTO from '@modules/pessoas/dtos/IUpdatePessoaDTO';

class PessoasRepository implements IPessoasRepository {
  private pessoas: Pessoa[] = [];

  public async findOne(name: string): Promise<Pessoa | undefined> {
    const findPessoa = this.pessoas.find(pessoa => pessoa.nome === name);

    return findPessoa;
  }

  public async findById(id: number): Promise<Pessoa | undefined> {
    const findPessoa = this.pessoas.find(pessoa => pessoa.id === id);

    return findPessoa;
  }

  public async findAll(): Promise<Pessoa[]> {
    return this.pessoas;
  }

  public async create(pessoaData: ICreatePessoaDTO): Promise<Pessoa> {
    const pessoa = new Pessoa();

    Object.assign(pessoa, { id: Math.random(), ...pessoaData });

    await this.pessoas.push(pessoa);

    return pessoa;
  }

  public async save(pessoa: IUpdatePessoaDTO): Promise<Pessoa> {
    const pessoaUpdated = new Pessoa();

    const findPessoa = this.pessoas.find(m => m.id === pessoa.id) || pessoa;

    Object.assign(pessoaUpdated, {
      ...findPessoa,
      ...pessoa,
    });

    return pessoaUpdated;
  }

  public async remove(id: number): Promise<void> {
    this.pessoas = this.pessoas.filter(m => m.id !== id);
  }
}

export default PessoasRepository;
