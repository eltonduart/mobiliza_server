import { getRepository, Repository } from 'typeorm';

import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
import ICreatePessoaDTO from '@modules/pessoas/dtos/ICreatePessoaDTO';
import IUpdatePessoaDTO from '@modules/pessoas/dtos/IUpdatePessoaDTO';

class PessoasRepository implements IPessoasRepository {
  private ormRepository: Repository<Pessoa>;

  constructor() {
    this.ormRepository = getRepository(Pessoa);
  }

  public async findOne(nome: string): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne({ nome });

    return pessoa;
  }

  public async findAll(query: any): Promise<Pessoa[]> {
    const pessoas = await this.ormRepository.find(
      query && {
        where: `Pessoa.nome ILIKE '%${query?.default || ''}%'`,
        order: {
          nome: 'ASC',
        },
      },
    );

    return pessoas || [];
  }

  public async create(pessoaData: ICreatePessoaDTO): Promise<Pessoa> {
    const pessoa = this.ormRepository.create(pessoaData);

    await this.ormRepository.save(pessoa);

    return pessoa;
  }

  public async findById(id: number): Promise<Pessoa | undefined> {
    const findEntity = await this.ormRepository.findOne({
      where: { id },
    });

    return findEntity || undefined;
  }

  public async save(pessoa: IUpdatePessoaDTO): Promise<Pessoa> {
    return this.ormRepository.save(pessoa);
  }

  public async remove(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default PessoasRepository;
