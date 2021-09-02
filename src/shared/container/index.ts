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

import DistritosRepository from '@modules/distritos/infra/typeorm/repositories/DistritosRepository';
import IDistritosRepository from '@modules/distritos/repositories/IDistritoRepository';

import OcorrenciasRepository from '@modules/ocorrencias/infra/typeorm/repositories/OcorrenciasRepository';
import IOcorrenciasRepository from '@modules/ocorrencias/repositories/IOcorrenciaRepository';

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
container.registerSingleton<IDistritosRepository>(
  'DistritosRepository',
  DistritosRepository,
);
container.registerSingleton<IOcorrenciasRepository>(
  'OcorrenciasRepository',
  OcorrenciasRepository,
);
