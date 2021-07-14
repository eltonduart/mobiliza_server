import 'reflect-metadata';
import FakeMunicipiosRepository from '@modules/municipios/repositories/fakes/FakeMunicipiosRepository';
import AppError from '@shared/errors/AppError';
import UpdateMunicipioService from './UpdateMunicipioService';

let fakeMunicipiosRepository: FakeMunicipiosRepository;
let updateMunicipioService: UpdateMunicipioService;

describe('UpdateMunicipio', () => {
  beforeEach(() => {
    fakeMunicipiosRepository = new FakeMunicipiosRepository();
    updateMunicipioService = new UpdateMunicipioService(fakeMunicipiosRepository);
  });

  it('should be able to update a municipio', async () => {
    const municipioToUpdate = await fakeMunicipiosRepository.create({
      nome: 'XYZ',
    } as any);

    const municipioUpdated = await updateMunicipioService.execute({
      id: municipioToUpdate.id,
      nome: 'XYZ 1',
    } as any);

    expect(municipioUpdated.nome).toBe('XYZ 1');
  });

  it('should not be able to update a municipio with the same nome from other', async () => {
    await fakeMunicipiosRepository.create({
      nome: 'XYZ',
    } as any);

    const municipioToUpdate = await fakeMunicipiosRepository.create({
      nome: 'XYZZ',
    } as any);

    await expect(
      updateMunicipioService.execute({
        id: municipioToUpdate.id,
        nome: 'XYZ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a municipio with the same nome from itself', async () => {
    const municipioToUpdate = await fakeMunicipiosRepository.create({
      nome: 'XYZ',
    } as any);

    const municipioUpdated = await updateMunicipioService.execute({
      id: municipioToUpdate.id,
      nome: 'XYZ',
    });

    expect(municipioUpdated.nome).toBe('XYZ');
  });
});
