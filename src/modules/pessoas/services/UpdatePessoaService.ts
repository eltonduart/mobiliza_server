import { injectable, inject } from 'tsyringe';
import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import AppError from '@shared/errors/AppError';
import IPessoaRepository from '../repositories/IPessoasRepository';
import IUpdatePessoaDTO from '../dtos/IUpdatePessoaDTO';

@injectable()
class UpdatePessoaService {
  constructor(
    @inject('PessoasRepository')
    private pessoaRepository: IPessoaRepository,
  ) {}

  public async execute(data: IUpdatePessoaDTO): Promise<Pessoa> {
    if (data.nome) {
      const checkPessoaExists = await this.pessoaRepository.findOne(data.nome);

      if (checkPessoaExists && checkPessoaExists.id !== data.id) {
        throw new AppError('Pessoa already exists.');
      }
    }

    const pessoa = await this.pessoaRepository.save(data);
    return pessoa;
  }
}

export default UpdatePessoaService;
