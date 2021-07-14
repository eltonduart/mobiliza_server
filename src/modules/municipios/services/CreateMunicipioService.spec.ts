import 'reflect-metadata';
import FakeMunicipioRepository from '@modules/municipios/repositories/fakes/FakeMunicipiosRepository';
import AppError from '@shared/errors/AppError';
import CreateMunicipioService from './CreateMunicipioService';

let fakeMunicipioRepository: FakeMunicipioRepository;
let createMunicipioService: CreateMunicipioService;

describe('CreateMunicipio', () => {
  beforeEach(() => {
    fakeMunicipioRepository = new FakeMunicipioRepository();
    createMunicipioService = new CreateMunicipioService(fakeMunicipioRepository);
  });

  it('should be able to create a municipio', async () => {
    const municipio = await createMunicipioService.execute({
      nome: 'XYZ',
      cod_ibge: '11111',
    });

    expect(municipio).toHaveProperty('id');
    expect(municipio.nome).toBe('XYZ');
  });

  it('should not be able to create a municipio with the same name', async () => {
    await createMunicipioService.execute({
      nome: 'XYZ',
      cod_ibge: '11111',
    });

    await expect(
      createMunicipioService.execute({
        nome: 'XYZ',
        cod_ibge: '11111',
        }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
