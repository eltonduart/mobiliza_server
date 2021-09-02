import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IOcorrenciasRepository from '../repositories/IOcorrenciasRepository';

@injectable()
class RemoveOcorrenciasService {
  constructor(
    @inject('OcorrenciasRepository')
    private pessoasRepository: IOcorrenciasRepository,
  ) { }

  public async execute(id: number): Promise<void> {
    const checkOcorrenciasExists = await this.ocorrenciasRepository.findById(id);

    if (!checkOcorrenciasExists) {
      throw new AppError('Ocorrencia does not exists.');
    }

    await this.ocorrenciasRepository.remove(id);
  }
}

export default RemoveOcorrenciasService;
