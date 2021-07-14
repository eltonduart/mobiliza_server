// /import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ValidateRegisterService from './ValidateRegisterService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ValidateRegisterService;

describe('ValidateRegisterService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ValidateRegisterService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to validate register', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JOHN JONES',
      email: 'jon@email.com',
      password: '12345',
      blocked: true,
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const validatedUser = await resetPasswordService.execute({
      token,
    });

    expect(validatedUser.blocked).toBe(false);
  });

  it('should not be able validate using non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able validate using non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able validate if passed more then 24 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JOHN JONES',
      email: 'jon@email.com',
      password: '12345',
      blocked: true,
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 25);
    });

    await expect(
      resetPasswordService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to validate if passed user is not blocked', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JOHN JONES',
      email: 'jon@email.com',
      password: '12345',
      blocked: false,
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPasswordService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
