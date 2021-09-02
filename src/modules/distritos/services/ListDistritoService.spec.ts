import 'reflect-metadata';
import FakeDistritosRepository from '@modules/distritos/repositories/fakes/FakeDistritosRepository';
import ListDistritosService from './ListDistritoService';

let fakeDistritosRepository: FakeDistritosRepository;
let listDistritosService: ListDistritosService;

describe('ListDistritos', () => {
  beforeEach(() => {
    fakeDistritosRepository = new FakeDistritosRepository();
    listDistritosService = new ListDistritosService(fakeDistritosRepository);
  });

  it('should be able to list the distritos', async () => {
    const distrito1 = await fakeDistritosRepository.create({
      name: 'XYZ',
    } as any);

    const distrito2 = await fakeDistritosRepository.create({
      name: 'XYY',
    } as any);

    const distritos = await listDistritosService.execute({});

    expect(distritos).toEqual([distrito1, distrito2]);
  });
});
