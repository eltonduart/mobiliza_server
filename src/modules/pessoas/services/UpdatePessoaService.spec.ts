import 'reflect-metadata';
import FakePessoasRepository from '@modules/pessoas/repositories/fakes/FakePessoasRepository';
import AppError from '@shared/errors/AppError';
import UpdatePessoaService from './UpdatePessoaService';

let fakePessoasRepository: FakePessoasRepository;
let updatePessoaService: UpdatePessoaService;

describe('UpdatePessoa', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    updatePessoaService = new UpdatePessoaService(fakePessoasRepository);
  });

  it('should be able to update a pessoa', async () => {
    const pessoaToUpdate = await fakePessoasRepository.create({
      nome: 'XYZ',
    } as any);

    const pessoaUpdated = await updatePessoaService.execute({
      id: pessoaToUpdate.id,
      nome: 'XYZ 1',
    } as any);

    expect(pessoaUpdated.nome).toBe('XYZ 1');
  });

  it('should not be able to update a pessoa with the same nome from other', async () => {
    await fakePessoasRepository.create({
      nome: 'XYZ',
    } as any);

    const pessoaToUpdate = await fakePessoasRepository.create({
      nome: 'XYZZ',
    } as any);

    await expect(
      updatePessoaService.execute({
        id: pessoaToUpdate.id,
        nome: 'XYZ',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a pessoa with the same nome from itself', async () => {
    const pessoaToUpdate = await fakePessoasRepository.create({
      nome: 'XYZ',
    } as any);

    const pessoaUpdated = await updatePessoaService.execute({
      id: pessoaToUpdate.id,
      nome: 'XYZ',
    });

    expect(pessoaUpdated.nome).toBe('XYZ');
  });
});
