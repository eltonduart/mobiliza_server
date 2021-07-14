import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPessoasRepository from '../repositories/IPessoasRepository';

@injectable()
class RemovePessoasService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const checkPessoasExists = await this.pessoasRepository.findById(id);

    if (!checkPessoasExists) {
      throw new AppError('Pessoa does not exists.');
    }

    await this.pessoasRepository.remove(id);
  }
}

export default RemovePessoasService;
