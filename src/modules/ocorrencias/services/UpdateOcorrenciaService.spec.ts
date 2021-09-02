import 'reflect-metadata';
import FakeOcorrenciasRepository from '@modules/ocorrencias/repositories/fakes/FakeOcorrenciasRepository';
import AppError from '@shared/errors/AppError';
import UpdateOcorrenciaService from './UpdateOcorrenciaService';

let fakeOcorrenciasRepository: FakeOcorrenciasRepository;
let updateOcorrenciaService: UpdateOcorrenciaService;

describe('UpdateOcorrencia', () => {
  beforeEach(() => {
    fakeOcorrenciasRepository = new FakeOcorrenciasRepository();
    updateOcorrenciaService = new UpdateOcorrenciaService(fakeOcorrenciasRepository);
  });

  it('should be able to update a ocorrencia', async () => {
    const ocorrenciaToUpdate = await fakeOcorrenciasRepository.create({
      nome: 'XYZ',
    } as any);

    const ocorrenciaUpdated = await updateOcorrenciaService.execute({
      id: ocorrenciaToUpdate.id,
      nome: 'XYZ 1',
    } as any);

    expect(ocorrenciaUpdated.nome).toBe('XYZ 1');
  });

  it('should not be able to update a ocorrencia with the same nome from other', async () => {
    await fakeOcorrenciasRepository.create({
      descricao: 'XYZ',
    } as any);

    const ocorrenciaToUpdate = await fakeOcorrenciasRepository.create({
      descricao: 'XYZZ',
    } as any);

    await expect(
      updateOcorrenciaService.execute({
        id: ocorrenciaToUpdate.id,
        descricao: 'XYZ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a ocorrencia with the same nome from itself', async () => {
    const ocorrenciaToUpdate = await fakeOcorrenciasRepository.create({
      descricao: 'XYZ',
    } as any);

    const ocorrenciaUpdated = await updateOcorrenciaService.execute({
      id: ocorrenciaToUpdate.id,
      descricao: 'XYZ',
    });

    expect(ocorrenciaUpdated.descricao).toBe('XYZ');
  });
});
