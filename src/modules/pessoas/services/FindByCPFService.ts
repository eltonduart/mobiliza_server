import { injectable, inject } from 'tsyringe';
import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPessoasRepository from '../repositories/IPessoasRepository';

@injectable()
class FindByCPFService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(cpf: string): Promise<Pessoa | undefined> {
    const pessoa = await this.pessoasRepository.findByField('cpf', cpf);
    return pessoa;
  }
}

export default FindByCPFService;
