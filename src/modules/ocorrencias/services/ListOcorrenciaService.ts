import { injectable, inject } from 'tsyringe';
import Ocorrencia from '@modules/ocorrencias/infra/typeorm/entities/Ocorrencia';
import IOcorrenciasRepository from '../repositories/IOcorrenciasRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListOcorrenciasService {
  constructor(
    @inject('OcorrenciasRepository')
    private ocorrenciasRepository: IOcorrenciasRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(query: any): Promise<Ocorrencia[]> {

    const ocorrencias = await this.ocorrenciasRepository.findAll(
      query,
    );
    return ocorrencias;
  }
}

export default ListOcorrenciasService;
