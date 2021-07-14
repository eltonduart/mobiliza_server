import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import PessoasRepository from '@modules/pessoas/infra/typeorm/repositories/PessoasRepository';
import IPessoasRepository from '@modules/pessoas/repositories/IPessoasRepository';

import MunicipiosRepository from '@modules/municipios/infra/typeorm/repositories/MunicipiosRepository';
import IMunicipiosRepository from '@modules/municipios/repositories/IMunicipioRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<IPessoasRepository>(
  'PessoasRepository',
  PessoasRepository,
);
container.registerSingleton<IMunicipiosRepository>(
  'MunicipiosRepository',
  MunicipiosRepository,
);
