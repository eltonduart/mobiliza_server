import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListDistritosService from '@modules/distritos/services/ListDistritoService';
import CreateDistritoService from '@modules/distritos/services/CreateDistritoService';
import UpdateDistritoService from '@modules/distritos/services/UpdateDistritoService';
import RemoveDistritoService from '@modules/distritos/services/RemoveDistritoService';
import AppError from '@shared/errors/AppError';

export default class DistritosController {
  async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;
    const listDistritos = container.resolve(ListDistritosService);
    const distritos = await listDistritos.execute(query);

    return response.json(classToClass(distritos));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    try {
      const createDistrito = container.resolve(CreateDistritoService);
      const distritos = await createDistrito.execute({
        ...body,
      });

      return response.json(classToClass(distritos));
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
      const updateDistrito = container.resolve(UpdateDistritoService);
      const distritos = await updateDistrito.execute({
        id: parseInt(id, 10),
        ...body,
      });

      return response.json(classToClass(distritos));
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
      const removeDistrito = container.resolve(RemoveDistritoService);
      await removeDistrito.execute(parseInt(id, 10));

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
