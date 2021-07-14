import 'reflect-metadata';
import FakePessoaRepository from '@modules/pessoas/repositories/fakes/FakePessoasRepository';
import AppError from '@shared/errors/AppError';
import CreatePessoaService from './CreatePessoaService';

let fakePessoaRepository: FakePessoaRepository;
let createPessoaService: CreatePessoaService;

describe('CreatePessoa', () => {
  beforeEach(() => {
    fakePessoaRepository = new FakePessoaRepository();
    createPessoaService = new CreatePessoaService(fakePessoaRepository);
  });

  it('should be able to create a pessoa', async () => {
    const pessoa = await createPessoaService.execute({
      nome: 'XYZ',
      dta_nascimento: new Date(),
      endereco: 'rua',
      municipio_id: 1,
    });

    expect(pessoa).toHaveProperty('id');
    expect(pessoa.nome).toBe('XYZ');
  });

  it('should not be able to create a pessoa with the same name', async () => {
    await createPessoaService.execute({
      nome: 'XYZ',
      dta_nascimento: new Date(),
      endereco: 'rua',
      municipio_id: 1,
    });

    await expect(
      createPessoaService.execute({
        nome: 'XYZ',
        dta_nascimento: new Date(),
        endereco: 'rua',
        municipio_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
