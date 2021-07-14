import 'reflect-metadata';
import FakePessoasRepository from '@modules/pessoas/repositories/fakes/FakePessoasRepository';
import ListPessoasService from './ListPessoaService';

let fakePessoasRepository: FakePessoasRepository;
let listPessoasService: ListPessoasService;

describe('ListPessoas', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    listPessoasService = new ListPessoasService(fakePessoasRepository);
  });

  it('should be able to list the pessoas', async () => {
    const pessoa1 = await fakePessoasRepository.create({
      name: 'XYZ',
    } as any);

    const pessoa2 = await fakePessoasRepository.create({
      name: 'XYY',
    } as any);

    const pessoas = await listPessoasService.execute({});

    expect(pessoas).toEqual([pessoa1, pessoa2]);
  });
});
