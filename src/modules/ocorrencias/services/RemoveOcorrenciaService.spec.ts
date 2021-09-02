import 'reflect-metadata';
import FakeOcorrenciasRepository from '@modules/ocorrencias/repositories/fakes/FakeOcorrenciasRepository';
import AppError from '@shared/errors/AppError';
import RemoveOcorrenciaService from './RemoveOcorrenciaService';

let fakeOcorrenciasRepository: FakeOcorrenciasRepository;
let removeOcorrenciaService: RemoveOcorrenciaService;

describe('RemoveOcorrencia', () => {
  beforeEach(() => {
    fakeOcorrenciasRepository = new FakeOcorrenciasRepository();
    removeOcorrenciaService = new RemoveOcorrenciaService(fakeOcorrenciasRepository);
  });

  it('should be able to remove a person', async () => {
    const ocorrenciaToUpdate = await fakeOcorrenciasRepository.create({
      name: 'XYZ',
    } as any);

    let ocorrencias = await fakeOcorrenciasRepository.findAll();
    expect(ocorrencias.length).toBe(1);

    await removeOcorrenciaService.execute(ocorrenciaToUpdate.id);
    ocorrencias = await fakeOcorrenciasRepository.findAll();
    expect(ocorrencias.length).toBe(0);
  });

  it('should throw an exception when trying to remove an unexistent id', async () => {
    await expect(removeOcorrenciaService.execute(1)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
