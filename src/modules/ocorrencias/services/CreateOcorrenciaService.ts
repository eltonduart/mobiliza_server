import { injectable, inject } from 'tsyringe';
import Ocorrencia from '@modules/ocorrencias/infra/typeorm/entities/Ocorrencia';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IOcorrenciaRepository from '../repositories/IOcorrenciasRepository';
import ICreateOcorrenciaDTO from '../dtos/ICreateOcorrenciaDTO';

@injectable()
class CreateOcorrenciaService {
  constructor(
    @inject('OcorrenciasRepository')
    private ocorrenciasRepository: IOcorrenciaRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreateOcorrenciaDTO): Promise<Ocorrencia> {
    const updatedData = { ...data };
    const checkOcorrenciaExists = await this.ocorrenciasRepository.findOne(
      updatedData.descricao,
    );

    if (checkOcorrenciaExists) {
      throw new AppError('Ocorrencia already exists.');
    }


    const ocorrencia = await this.ocorrenciasRepository.create(updatedData);

    return ocorrencia;
  }
}

export default CreateOcorrenciaService;
