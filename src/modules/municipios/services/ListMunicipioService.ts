import { injectable, inject } from 'tsyringe';
import Municipio from '@modules/municipios/infra/typeorm/entities/Municipio';
import IMunicipiosRepository from '../repositories/IMunicipiosRepository';

@injectable()
class ListMunicipiosService {
  constructor(
    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository,
  ) {}

  public async execute(query: any): Promise<Municipio[]> {
    const municipios = await this.municipiosRepository.findAll(query);
    return municipios;
  }
}

export default ListMunicipiosService;
