import 'reflect-metadata';
import FakeOcorrenciaRepository from '@modules/ocorrencias/repositories/fakes/FakeOcorrenciasRepository';
import AppError from '@shared/errors/AppError';
import CreateOcorrenciaService from './CreateOcorrenciaService';

let fakeOcorrenciaRepository: FakeOcorrenciaRepository;
let createOcorrenciaService: CreateOcorrenciaService;

describe('CreateOcorrencia', () => {
  beforeEach(() => {
    fakeOcorrenciaRepository = new FakeOcorrenciaRepository();
    createOcorrenciaService = new CreateOcorrenciaService(fakeOcorrenciaRepository);
  });

  it('should be able to create a pessoa', async () => {
    const ocorrencia = await createOcorrenciaService.execute({
      descricao: 'XYZ',
      dta_previsao: new Date(),
      concluida: 'N',
      pessoa_id: 1,
    });

    expect(ocorrencia).toHaveProperty('id');
    expect(ocorrencia.descricao).toBe('XYZ');
  });

  it('should not be able to create a pessoa with the same name', async () => {
    await createOcorrenciaService.execute({
      descricao: 'XYZ',
      dta_previsao: new Date(),
      concluida: 'N',
      pessoa_id: 1,
    });

    await expect(
      createOcorrenciaService.execute({
        descricao: 'XYZ',
        dta_previsao: new Date(),
        concluida: 'N',
        pessoa_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
