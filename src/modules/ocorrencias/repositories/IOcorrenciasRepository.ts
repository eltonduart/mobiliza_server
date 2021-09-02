import Ocorrencia from '../infra/typeorm/entities/Ocorrencia';
import ICreateOcorrenciaDTO from '../dtos/ICreateOcorrenciaDTO';
import IUpdateOcorrenciaDTO from '../dtos/IUpdateOcorrenciaDTO';

export default interface IOcorrenciasRepository {
  findAll(query?: any): Promise<Ocorrencia[]>;
  findOne(descricao: string): Promise<Ocorrencia | undefined>;
  findById(id: number): Promise<Ocorrencia | undefined>;
  findByField(field: string, value: any): Promise<Ocorrencia | undefined>;
  create(ocorrenciaData: ICreateOcorrenciaDTO): Promise<Ocorrencia>;
  save(ocorrencia: IUpdateOcorrenciaDTO): Promise<Ocorrencia>;
  remove(id: number): Promise<void>;
}
