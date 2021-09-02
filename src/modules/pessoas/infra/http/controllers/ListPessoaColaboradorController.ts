import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPessoaColaboradorService from '@modules/pessoas/services/ListPessoaColaboradorService';

export default class ListaPessoaColaboradorController {
  async index(request: Request, response: Response): Promise<Response> {
    console.log('request 12345');
    const Pessoa = container.resolve(ListPessoaColaboradorService);
    const pessoa = await Pessoa.execute(request.user.id);

    return response.json(classToClass(pessoa));
  }
}
