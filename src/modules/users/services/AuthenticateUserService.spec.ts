import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let fakeMailProvider: FakeMailProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
let fakeUserTokensProvider: FakeUserTokensRepository;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensProvider = new FakeUserTokensRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
      fakeMailProvider,
      fakeUserTokensProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    const response = await authenticateUser.execute({
      email: user.email,
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing email', async () => {
    await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    expect(
      authenticateUser.execute({
        email: 'fakeemail1@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate if is blocked', async () => {
    const { user } = await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    expect(
      authenticateUser.execute({
        email: user.email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    await expect(
      authenticateUser.execute({
        email: 'fakeemail@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
