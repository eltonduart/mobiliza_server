import { injectable, inject } from 'tsyringe';
import Ocorrencia from '@modules/ocorrencias/infra/typeorm/entities/Ocorrencia';
import AppError from '@shared/errors/AppError';
import IOcorrenciaRepository from '../repositories/IOcorrenciasRepository';
import IUpdateOcorrenciaDTO from '../dtos/IUpdateOcorrenciaDTO';

@injectable()
class UpdateOcorrenciaService {
  constructor(
    @inject('OcorrenciasRepository')
    private ocorrenciaRepository: IOcorrenciaRepository,
  ) { }

  public async execute(data: IUpdateOcorrenciaDTO): Promise<Ocorrencia> {
    if (data.descricao) {
      const checkOcorrenciaExists = await this.ocorrenciaRepository.findOne(data.descricao);

      if (checkOcorrenciaExists && checkOcorrenciaExists.id !== data.id) {
        throw new AppError('Ocorrencia already exists.');
      }
    }

    const ocorrencia = await this.ocorrenciaRepository.save(data);
    return ocorrencia;
  }
}

export default UpdateOcorrenciaService;
