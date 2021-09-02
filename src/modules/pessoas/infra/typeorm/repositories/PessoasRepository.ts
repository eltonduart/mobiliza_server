import { getRepository, Repository, getConnection } from 'typeorm';

import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';
import ICreatePessoaDTO from '@modules/pessoas/dtos/ICreatePessoaDTO';
import IUpdatePessoaDTO from '@modules/pessoas/dtos/IUpdatePessoaDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class PessoasRepository implements IPessoasRepository {
  private ormRepository: Repository<Pessoa>;

  constructor() {
    this.ormRepository = getRepository(Pessoa);
  }

  public async findOne(nome: string): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne({ nome });

    return pessoa;
  }

  public async findByField(
    field: string,
    value: any,
  ): Promise<Pessoa | undefined> {
    const pessoa = await this.ormRepository.findOne({ [field]: value });

    return pessoa;
  }

  public async findAll(query: any, owner_user_id?: string): Promise<Pessoa[]> {
    let sqlQuery = `Pessoa.nome ILIKE '%${query?.default || ''}%' `;
    if (owner_user_id) {
      sqlQuery += `and Pessoa.owner_user_id ='${owner_user_id}'`;
    }

    const pessoas = await this.ormRepository.find(
      query && {
        // eslint-disable-next-line prettier/prettier
        where: sqlQuery,
        order: {
          nome: 'ASC',
        },
      },
    );

    return pessoas || [];
  }

  public async findByOwner(owner_user_id: string): Promise<Pessoa[]> {
    const pessoas = await this.ormRepository.find({
      where: `Pessoa.owner_user_id ='${owner_user_id}'`,
      order: {
        nome: 'ASC',
      },
    });

    return pessoas || [];
  }

  public async findById(id: number): Promise<Pessoa | undefined> {
    const findEntity = await this.ormRepository.findOne({
      where: { id },
    });

    return findEntity || undefined;
  }

  public async create(pessoaData: ICreatePessoaDTO): Promise<Pessoa> {
    const pessoa = this.ormRepository.create(pessoaData);

    await this.ormRepository.save(pessoa);

    const newpessoa = await this.findById(pessoa.id);

    return newpessoa || pessoa;
  }

  public async save(pessoa: IUpdatePessoaDTO): Promise<Pessoa> {
    const result = await this.ormRepository.save(pessoa);

    const updpessoa = await this.findById(result.id);

    return updpessoa || result;
  }

  public async remove(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async pessoa_usuario(): Promise<any> {
    const resp = await getConnection()
      .createQueryBuilder()
      .select('pessoa_user.nome')
      .from(Pessoa, 'pessoas')
      .leftJoin(User, 'users', 'users.id::varchar = "pessoas".owner_user_id')
      .innerJoin(Pessoa, 'pessoa_user', 'pessoa_user.id = "users".pessoa_id')
      .execute();
    return resp;
  }
}

export default PessoasRepository;
