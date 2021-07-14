import { injectable, inject } from 'tsyringe';
import path from 'path';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
  email: string;
  name: string;
  password: string;
}

interface IResponse {
  user: User;
  email?: string | void;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already in use.');
    }

    const hashedPassword = await this.hashProvider.genereteHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      blocked: true,
    });

    const { token } = await this.userTokensRepository.generate(user.id);

    const registerTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'register.hbs',
    );

    const message = await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Mais Cidadão] Validação de registro',
      templateData: {
        file: registerTemplate,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_URL}/validate-email?token=${token}`,
        },
      },
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return {
      user,
      email: message,
    };
  }
}

export default CreateUserService;
