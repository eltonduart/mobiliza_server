import 'reflect-metadata';
import FakeDistritosRepository from '@modules/distritos/repositories/fakes/FakeDistritosRepository';
import AppError from '@shared/errors/AppError';
import RemoveDistritoService from './RemoveDistritoService';

let fakeDistritosRepository: FakeDistritosRepository;
let removeDistritoService: RemoveDistritoService;

describe('RemovePessoa', () => {
  beforeEach(() => {
    fakeDistritosRepository = new FakeDistritosRepository();
    removeDistritoService = new RemoveDistritoService(fakeDistritosRepository);
  });

  it('should be able to remove a person', async () => {
    const distritoToUpdate = await fakeDistritosRepository.create({
      name: 'XYZ',
    } as any);

    let distritos = await fakeDistritosRepository.findAll();
    expect(distritos.length).toBe(1);

    await removeDistritoService.execute(distritoToUpdate.id);
    distritos = await fakeDistritosRepository.findAll();
    expect(distritos.length).toBe(0);
  });

  it('should throw an exception when trying to remove an unexistent id', async () => {
    await expect(removeDistritoService.execute(1)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
