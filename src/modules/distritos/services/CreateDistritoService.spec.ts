import 'reflect-metadata';
import FakeDistritoRepository from '@modules/distritos/repositories/fakes/FakeDistritosRepository';
import AppError from '@shared/errors/AppError';
import CreateDistritoService from './CreateDistritoService';

let fakeDistritoRepository: FakeDistritoRepository;
let createDistritoService: CreateDistritoService;

describe('CreateDistrito', () => {
  beforeEach(() => {
    fakeDistritoRepository = new FakeDistritoRepository();
    createDistritoService = new CreateDistritoService(fakeDistritoRepository);
  });

  it('should be able to create a pessoa', async () => {
    const distrito = await createDistritoService.execute({
      nome: 'XYZ',
      municipio_id: 1,
    });

    expect(distrito).toHaveProperty('id');
    expect(distrito.nome).toBe('XYZ');
  });

  it('should not be able to create a distrito with the same name', async () => {
    await createDistritoService.execute({
      nome: 'XYZ',
      municipio_id: 1,
    });

    await expect(
      createDistritoService.execute({
        nome: 'XYZ',
        municipio_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
