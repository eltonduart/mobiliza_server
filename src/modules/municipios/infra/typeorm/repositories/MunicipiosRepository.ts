import { getRepository, Repository } from 'typeorm';

import Municipio from '@modules/municipios/infra/typeorm/entities/Municipio';
import IMunicipiosRepository from '@modules/municipios/repositories/IMunicipiosRepository';
import ICreateMunicipioDTO from '@modules/municipios/dtos/ICreateMunicipioDTO';
import IUpdateMunicipioDTO from '@modules/municipios/dtos/IUpdateMunicipioDTO';

class MunicipiosRepository implements IMunicipiosRepository {
  private ormRepository: Repository<Municipio>;

  constructor() {
    this.ormRepository = getRepository(Municipio);
  }

  public async findOne(nome: string): Promise<Municipio | undefined> {
    const municipio = await this.ormRepository.findOne({ nome });

    return municipio;
  }

  public async findAll(query: any): Promise<Municipio[]> {
    const municipios = await this.ormRepository.find(
      query && {
        where: `Municipio.nome ILIKE '%${query?.default || ''}%'
        `,
        order: {
          nome: 'ASC',
        },
      },
    );

    return municipios || [];
  }

  public async create(municipioData: ICreateMunicipioDTO): Promise<Municipio> {
    const municipio = this.ormRepository.create(municipioData);

    await this.ormRepository.save(municipio);

    return municipio;
  }

  public async findById(id: number): Promise<Municipio | undefined> {
    const findEntity = await this.ormRepository.findOne({
      where: { id },
    });

    return findEntity || undefined;
  }

  public async save(municipio: IUpdateMunicipioDTO): Promise<Municipio> {
    return this.ormRepository.save(municipio);
  }

  public async remove(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default MunicipiosRepository;
