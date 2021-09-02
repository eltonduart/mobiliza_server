import { injectable, inject } from 'tsyringe';
import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPessoasRepository from '../repositories/IPessoasRepository';

@injectable()
class ListPessoasColaboradorService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(user_id: string): Promise<Pessoa[]> {
    const pessoaColaborador = await this.pessoasRepository.pessoa_usuario(
      user_id,
    );
    console.log({ pessoaColaborador });
    return pessoaColaborador;
  }
}

export default ListPessoasColaboradorService;
