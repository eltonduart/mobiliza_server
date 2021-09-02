import Ocorrencia from '@modules/ocorrencias/infra/typeorm/entities/Ocorrencia';
import IOcorrenciasRepository from '@modules/ocorrencias/repositories/IOcorrenciasRepository';
import ICreateOcorrenciaDTO from '@modules/ocorrencias/dtos/ICreateOcorrenciaDTO';
import IUpdateOcorrenciaDTO from '@modules/ocorrencias/dtos/IUpdateOcorrenciaDTO';

class OcorrenciasRepository implements IOcorrenciasRepository {
  private ocorrencias: Ocorrencia[] = [];

  public async findOne(name: string): Promise<Ocorrencia | undefined> {
    const findOcorrencia = this.ocorrencias.find(
      ocorrencia => ocorrencia.descricao === name,
    );

    return findOcorrencia;
  }

  public async findById(id: number): Promise<Ocorrencia | undefined> {
    const findOcorrencia = this.ocorrencias.find(
      ocorrencia => ocorrencia.id === id,
    );

    return findOcorrencia;
  }

  public async findAll(): Promise<Ocorrencia[]> {
    return this.ocorrencias;
  }

  public async create(
    ocorrenciaData: ICreateOcorrenciaDTO,
  ): Promise<Ocorrencia> {
    const ocorrencia = new Ocorrencia();

    Object.assign(ocorrencia, { id: Math.random(), ...ocorrenciaData });

    await this.ocorrencias.push(ocorrencia);

    return ocorrencia;
  }

  public async save(ocorrencia: IUpdateOcorrenciaDTO): Promise<Ocorrencia> {
    const ocorrenciaUpdated = new Ocorrencia();

    const findOcorrencia = this.ocorrencias.find(m => m.id === ocorrencia.id) || ocorrencia;

    Object.assign(ocorrenciaUpdated, {
      ...findOcorrencia,
      ...ocorrencia,
    });

    return ocorrenciaUpdated;
  }

  public async remove(id: number): Promise<void> {
    this.ocorrencias = this.ocorrencias.filter(m => m.id !== id);
  }
}

export default OcorrenciasRepository;
