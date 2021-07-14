import 'reflect-metadata';
import FakeMunicipiosRepository from '@modules/municipios/repositories/fakes/FakeMunicipiosRepository';
import AppError from '@shared/errors/AppError';
import RemoveMunicipioService from './RemoveMunicipioService';

let fakeMunicipiosRepository: FakeMunicipiosRepository;
let removeMunicipioService: RemoveMunicipioService;

describe('RemoveMunicipio', () => {
  beforeEach(() => {
    fakeMunicipiosRepository = new FakeMunicipiosRepository();
    removeMunicipioService = new RemoveMunicipioService(fakeMunicipiosRepository);
  });

  it('should be able to remove a person', async () => {
    const personToUpdate = await fakeMunicipiosRepository.create({
      name: 'XYZ',
    } as any);

    let pessoas = await fakeMunicipiosRepository.findAll();
    expect(pessoas.length).toBe(1);

    await removeMunicipioService.execute(personToUpdate.id);
    pessoas = await fakeMunicipiosRepository.findAll();
    expect(pessoas.length).toBe(0);
  });

  it('should throw an exception when trying to remove an unexistent id', async () => {
    await expect(removeMunicipioService.execute(1)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
