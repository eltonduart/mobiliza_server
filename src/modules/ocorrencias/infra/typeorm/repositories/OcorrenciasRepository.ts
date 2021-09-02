import { getRepository, Repository } from 'typeorm';

import Ocorrencia from '@modules/ocorrencias/infra/typeorm/entities/Ocorrencia';
import IOcorrenciasRepository from '@modules/ocorrencias/repositories/IOcorrenciasRepository';
import ICreateOcorrenciaDTO from '@modules/ocorrencias/dtos/ICreateOcorrenciaDTO';
import IUpdateOcorrenciaDTO from '@modules/ocorrencias/dtos/IUpdateOcorrenciaDTO';

class OcorrenciasRepository implements IOcorrenciasRepository {
  private ormRepository: Repository<Ocorrencia>;

  constructor() {
    this.ormRepository = getRepository(Ocorrencia);
  }

  public async findOne(descricao: string): Promise<Ocorrencia | undefined> {
    const ocorrencia = await this.ormRepository.findOne({ descricao });

    return ocorrencia;
  }

  public async findByField(
    field: string,
    value: any,
  ): Promise<Ocorrencia | undefined> {
    const ocorrencia = await this.ormRepository.findOne({ [field]: value });

    return ocorrencia;
  }

  public async findAll(query: any): Promise<Ocorrencia[]> {
    let sqlQuery = `Ocorrencia.descricao ILIKE '%${query?.default || ''}%' `;
    if (query.pessoa_id) {
      sqlQuery += `and Ocorrencia.pessoa_id ='${query.pessoa_id}'`;
    }

    const ocorrencia = await this.ormRepository.find(
      query && {
        // eslint-disable-next-line prettier/prettier
        where: sqlQuery,
        order: {
          descricao: 'ASC',
        },
      },
    );

    return ocorrencia || [];
  }

  public async findById(id: number): Promise<Ocorrencia | undefined> {
    const findEntity = await this.ormRepository.findOne({
      where: { id },
    });

    return findEntity || undefined;
  }

  public async create(
    ocorrenciaData: ICreateOcorrenciaDTO,
  ): Promise<Ocorrencia> {
    const ocorrencia = this.ormRepository.create(ocorrenciaData);

    await this.ormRepository.save(ocorrencia);

    const newocorrencia = await this.findById(ocorrencia.id);

    return newocorrencia || ocorrencia;
  }

  public async save(ocorrencia: IUpdateOcorrenciaDTO): Promise<Ocorrencia> {
    const result = await this.ormRepository.save(ocorrencia);

    const updocorrencia = await this.findById(result.id);

    return updocorrencia || result;
  }

  public async remove(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default OcorrenciasRepository;
