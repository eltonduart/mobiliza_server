import { injectable, inject } from 'tsyringe';
import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IPessoaRepository from '../repositories/IPessoasRepository';
import ICreatePessoaDTO from '../dtos/ICreatePessoaDTO';

@injectable()
class CreatePessoaService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoaRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreatePessoaDTO): Promise<Pessoa> {
    const updatedData = { ...data };
    const checkPessoaExists = await this.pessoasRepository.findOne(
      updatedData.nome,
    );

    if (checkPessoaExists) {
      throw new AppError('Pessoa already exists.');
    }


    delete updatedData.password;
    delete updatedData.email;

    const pessoa = await this.pessoasRepository.create(updatedData);

    if (
      data.tipo_usuario &&
      ['1', '2', '3'].includes(data.tipo_usuario as any)
    ) {
      if (data.email && data.password) {
        const hashedPassword = await this.hashProvider.genereteHash(
          data.password,
        );
        await this.usersRepository.create({
          email: data.email,
          name: data.nome,
          password: hashedPassword,
          blocked: false,
          pessoa_id: pessoa.id,
        });
      }
    }

    return pessoa;
  }
}

export default CreatePessoaService;
