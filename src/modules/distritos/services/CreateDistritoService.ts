import { injectable, inject } from 'tsyringe';
import Distrito from '@modules/distritos/infra/typeorm/entities/Distrito';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IDistritoRepository from '../repositories/IDistritosRepository';
import ICreateDistritoDTO from '../dtos/ICreateDistritoDTO';

@injectable()
class CreateDistritoService {
  constructor(
    @inject('DistritosRepository')
    private distritosRepository: IDistritoRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreateDistritoDTO): Promise<Distrito> {
    const updatedData = { ...data };
    const checkDistritoExists = await this.distritosRepository.findOne(
      updatedData.nome,
    );

    if (checkDistritoExists) {
      throw new AppError('Distrito already exists.');
    }

    const distrito = await this.distritosRepository.create(updatedData);

    return distrito;
  }
}

export default CreateDistritoService;
