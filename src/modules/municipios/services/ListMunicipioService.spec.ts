import 'reflect-metadata';
import FakeMunicipiosRepository from '@modules/municipios/repositories/fakes/FakeMunicipiosRepository';
import ListMunicipiosService from './ListMunicipioService';

let fakeMunicipiosRepository: FakeMunicipiosRepository;
let listMunicipiosService: ListMunicipiosService;

describe('ListMunicipios', () => {
  beforeEach(() => {
    fakeMunicipiosRepository = new FakeMunicipiosRepository();
    listMunicipiosService = new ListMunicipiosService(fakeMunicipiosRepository);
  });

  it('should be able to list the municipios', async () => {
    const municipio1 = await fakeMunicipiosRepository.create({
      name: 'XYZ',
    } as any);

    const municipio2 = await fakeMunicipiosRepository.create({
      name: 'XYY',
    } as any);

    const municipios = await listMunicipiosService.execute({});

    expect(municipios).toEqual([municipio1, municipio2]);
  });
});
