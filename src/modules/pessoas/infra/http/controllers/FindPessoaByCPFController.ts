import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindByCPFService from '@modules/pessoas/services/FindByCPFService';

export default class PessoasController {
  async index(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;
    const Pessoa = container.resolve(FindByCPFService);
    const pessoa = await Pessoa.execute(cpf as string);

    return response.json(classToClass(pessoa));
  }
}
