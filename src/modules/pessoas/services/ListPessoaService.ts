import { injectable, inject } from 'tsyringe';
import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListPessoasService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(query: any, user_id: string): Promise<Pessoa[]> {

    const user = await this.usersRepository.findById(user_id);
    const pessoaOwner = await this.pessoasRepository.findByField(
      'email',
      user?.email,
    );


    const pessoas = await this.pessoasRepository.findAll(
      query,
      ['2', '3', undefined].includes(pessoaOwner?.tipo_usuario)
        ? user?.id
        : undefined,
    );
    return pessoas;
  }
}

export default ListPessoasService;
