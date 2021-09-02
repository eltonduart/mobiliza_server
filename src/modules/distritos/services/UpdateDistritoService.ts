import { injectable, inject } from 'tsyringe';
import Distrito from '@modules/distritos/infra/typeorm/entities/Distrito';
import AppError from '@shared/errors/AppError';
import IDistritoRepository from '../repositories/IDistritosRepository';
import IUpdateDistritoDTO from '../dtos/IUpdateDistritoDTO';

@injectable()
class UpdateDistritoService {
  constructor(
    @inject('DistritosRepository')
    private distritoRepository: IDistritoRepository,
  ) { }

  public async execute(data: IUpdateDistritoDTO): Promise<Distrito> {
    if (data.nome) {
      const checkDistritoExists = await this.distritoRepository.findOne(data.nome);

      if (checkDistritoExists && checkDistritoExists.id !== data.id) {
        throw new AppError('Distrito already exists.');
      }
    }

    const distrito = await this.distritoRepository.save(data);
    return distrito;
  }
}

export default UpdateDistritoService;
