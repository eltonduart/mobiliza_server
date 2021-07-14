import 'reflect-metadata';
import FakePessoasRepository from '@modules/pessoas/repositories/fakes/FakePessoasRepository';
import AppError from '@shared/errors/AppError';
import RemovePessoaService from './RemovePessoaService';

let fakePessoasRepository: FakePessoasRepository;
let removePessoaService: RemovePessoaService;

describe('RemovePessoa', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    removePessoaService = new RemovePessoaService(fakePessoasRepository);
  });

  it('should be able to remove a person', async () => {
    const personToUpdate = await fakePessoasRepository.create({
      name: 'XYZ',
    } as any);

    let persons = await fakePessoasRepository.findAll();
    expect(persons.length).toBe(1);

    await removePessoaService.execute(personToUpdate.id);
    persons = await fakePessoasRepository.findAll();
    expect(persons.length).toBe(0);
  });

  it('should throw an exception when trying to remove an unexistent id', async () => {
    await expect(removePessoaService.execute(1)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
