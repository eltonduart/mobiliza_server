import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDistritosRepository from '../repositories/IDistritosRepository';

@injectable()
class RemoveDistritosService {
  constructor(
    @inject('DistritosRepository')
    private distritosRepository: IDistritosRepository,
  ) { }

  public async execute(id: number): Promise<void> {
    const checkDistritosExists = await this.distritosRepository.findById(id);

    if (!checkDistritosExists) {
      throw new AppError('Distrito does not exists.');
    }

    await this.distritosRepository.remove(id);
  }
}

export default RemoveDistritosService;
