import { injectable, inject } from 'tsyringe';
import Municipio from '@modules/municipios/infra/typeorm/entities/Municipio';
import AppError from '@shared/errors/AppError';
import IMunicipioRepository from '../repositories/IMunicipiosRepository';
import IUpdateMunicipioDTO from '../dtos/IUpdateMunicipioDTO';

@injectable()
class UpdateMunicipioService {
  constructor(
    @inject('MunicipiosRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute(data: IUpdateMunicipioDTO): Promise<Municipio> {
    if (data.nome) {
      const checkMunicipioExists = await this.municipioRepository.findOne(data.nome);

      if (checkMunicipioExists && checkMunicipioExists.id !== data.id) {
        throw new AppError('Municipio already exists.');
      }
    }

    const municipio = await this.municipioRepository.save(data);
    return municipio;
  }
}

export default UpdateMunicipioService;
