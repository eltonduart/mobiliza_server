import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUsersTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
}

@injectable()
export default class ValidateRegisterService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token }: IRequest): Promise<User> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Este token de usuário não existe');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    if (!user.blocked) {
      throw new AppError('Esta conta já foi validada');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 24);

    if (isAfter(Date.now(), compareDate)) {
      this.usersRepository.remove(user.id);
      throw new AppError('Link expirado');
    }

    user.blocked = false;

    await this.usersRepository.save(user);

    return user;
  }
}
