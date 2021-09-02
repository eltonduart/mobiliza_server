import 'reflect-metadata';
import FakeOcorrenciasRepository from '@modules/ocorrencias/repositories/fakes/FakeOcorrenciasRepository';
import ListOcorrenciasService from './ListOcorrenciaService';

let fakeOcorrenciasRepository: FakeOcorrenciasRepository;
let listOcorrenciasService: ListOcorrenciasService;

describe('ListOcorrencias', () => {
  beforeEach(() => {
    fakeOcorrenciasRepository = new FakeOcorrenciasRepository();
    listOcorrenciasService = new ListOcorrenciasService(fakeOcorrenciasRepository);
  });

  it('should be able to list the ocorrencias', async () => {
    const ocorrencia1 = await fakeOcorrenciasRepository.create({
      name: 'XYZ',
    } as any);

    const ocorrencia2 = await fakeOcorrenciasRepository.create({
      name: 'XYY',
    } as any);

    const ocorrencias = await listOcorrenciasService.execute({});

    expect(ocorrencias).toEqual([ocorrencia1, ocorrencia2]);
  });
});
