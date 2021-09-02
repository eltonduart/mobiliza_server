import 'reflect-metadata';
import FakeDistritosRepository from '@modules/distritos/repositories/fakes/FakeDistritosRepository';
import AppError from '@shared/errors/AppError';
import UpdateDistritoService from './UpdateDistritoService';

let fakeDistritosRepository: FakeDistritosRepository;
let updateDistritoService: UpdateDistritoService;

describe('UpdateDistrito', () => {
  beforeEach(() => {
    fakeDistritosRepository = new FakeDistritosRepository();
    updateDistritoService = new UpdateDistritoService(fakeDistritosRepository);
  });

  it('should be able to update a distrito', async () => {
    const distritoToUpdate = await fakeDistritosRepository.create({
      nome: 'XYZ',
    } as any);

    const distritoUpdated = await updateDistritoService.execute({
      id: distritoToUpdate.id,
      nome: 'XYZ 1',
    } as any);

    expect(distritoUpdated.nome).toBe('XYZ 1');
  });

  it('should not be able to update a pessoa with the same nome from other', async () => {
    await fakeDistritosRepository.create({
      nome: 'XYZ',
    } as any);

    const distritoToUpdate = await fakeDistritosRepository.create({
      nome: 'XYZZ',
    } as any);

    await expect(
      updateDistritoService.execute({
        id: distritoToUpdate.id,
        nome: 'XYZ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a pessoa with the same nome from itself', async () => {
    const distritoToUpdate = await fakeDistritosRepository.create({
      nome: 'XYZ',
    } as any);

    const distritoUpdated = await updateDistritoService.execute({
      id: distritoToUpdate.id,
      nome: 'XYZ',
    });

    expect(distritoUpdated.nome).toBe('XYZ');
  });
});
