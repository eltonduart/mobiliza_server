import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMunicipiosRepository from '../repositories/IMunicipiosRepository';

@injectable()
class RemoveMunicipiosService {
  constructor(
    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    const checkMunicipiosExists = await this.municipiosRepository.findById(id);

    if (!checkMunicipiosExists) {
      throw new AppError('Municipio does not exists.');
    }

    await this.municipiosRepository.remove(id);
  }
}

export default RemoveMunicipiosService;
