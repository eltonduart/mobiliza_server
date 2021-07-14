import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPessoasService from '@modules/pessoas/services/ListPessoaService';
import CreatePessoaService from '@modules/pessoas/services/CreatePessoaService';
import UpdatePessoaService from '@modules/pessoas/services/UpdatePessoaService';
import RemovePessoaService from '@modules/pessoas/services/RemovePessoaService';
import AppError from '@shared/errors/AppError';

export default class PessoasController {
  async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;
    const listPessoas = container.resolve(ListPessoasService);
    const pessoas = await listPessoas.execute(query);

    return response.json(classToClass(pessoas));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { body, user } = request;
    try {
      const createPessoa = container.resolve(CreatePessoaService);
      const pessoas = await createPessoa.execute({
        ...body,
        owner_user_id: user.id,
      });

      return response.json(classToClass(pessoas));
    } catch (error) {
      if (process.env.NODE_ENV === 'dev') {
        return response.status(500).json(error);
      }
      return response.status(500).json('Erro interno');
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    const { id } = request.params;
    try {
      const updatePessoa = container.resolve(UpdatePessoaService);
      const pessoas = await updatePessoa.execute({
        id: parseInt(id, 10),
        ...body,
      });

      return response.json(classToClass(pessoas));
    } catch (error) {
      if (process.env.NODE_ENV === 'dev') {
        return response.json(error);
      }
      return response.status(500).json('Erro interno');
    }
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const removePessoa = container.resolve(RemovePessoaService);
      await removePessoa.execute(parseInt(id, 10));

      return response.json({ message: 'Pessoa removed successfully' });
    } catch (error) {
      if (error instanceof AppError) response.json(error);

      if (process.env.NODE_ENV === 'dev') {
        return response.send(error);
      }

      return response.status(500).json('Erro interno');
    }
  }
}
