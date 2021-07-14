import { injectable, inject } from 'tsyringe';
import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';

@injectable()
class ListPessoasService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute(query: any): Promise<Pessoa[]> {
    const pessoas = await this.pessoasRepository.findAll(query);
    return pessoas;
  }
}

export default ListPessoasService;
