import { injectable, inject } from 'tsyringe';
import Municipio from '@modules/municipios/infra/typeorm/entities/Municipio';
import AppError from '@shared/errors/AppError';
import IMunicipioRepository from '../repositories/IMunicipiosRepository';
import ICreateMunicipioDTO from '../dtos/ICreateMunicipioDTO';

@injectable()
class CreateMunicipioService {
  constructor(
    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipioRepository,
  ) {}

  public async execute(data: ICreateMunicipioDTO): Promise<Municipio> {
    const checkMunicipioExists = await this.municipiosRepository.findOne(data.nome);

    if (checkMunicipioExists) {
      throw new AppError('Municipio already exists.');
    }

    const municipio = await this.municipiosRepository.create(data);

    return municipio;
  }
}

export default CreateMunicipioService;
