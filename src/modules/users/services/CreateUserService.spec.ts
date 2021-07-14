import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensProvider: FakeUserTokensRepository;

describe('CreateUser', () => {
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
  });

  it('should be able to create a new user', async () => {
    const { user } = await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be registered with blocked true ', async () => {
    const { user } = await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    expect(user.blocked).toBe(true);
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    await expect(
      createUser.execute({
        name: 'John john',
        email: 'fakeemail@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve poder receber um email de validação ao fazer um registro', async () => {
    await fakeUsersRepository.create({
      name: 'JOHN JONES',
      email: 'jon@email.com',
      password: '12345',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Deve poder receber um token de registro por email', async () => {
    const generateToken = jest.spyOn(fakeUserTokensProvider, 'generate');

    const { user } = await createUser.execute({
      name: 'John john',
      email: 'fakeemail@email.com',
      password: '12345',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
