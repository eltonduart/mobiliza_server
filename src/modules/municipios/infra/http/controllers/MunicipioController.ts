import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListMunicipiosService from '@modules/municipios/services/ListMunicipioService';
import CreateMunicipioService from '@modules/municipios/services/CreateMunicipioService';
import UpdateMunicipioService from '@modules/municipios/services/UpdateMunicipioService';
import RemoveMunicipioService from '@modules/municipios/services/RemoveMunicipioService';
import AppError from '@shared/errors/AppError';

export default class MunicipiosController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const { query } = request;
      const listMunicipios = container.resolve(ListMunicipiosService);
      const municipios = await listMunicipios.execute(query);

      return response.json(classToClass(municipios));
    } catch (error) {
      if (process.env.NODE_ENV === 'dev') {
        return response.json(error);
      }
      return response.status(500).json('Erro interno');
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    try {
      const createMunicipio = container.resolve(CreateMunicipioService);
      const municipios = await createMunicipio.execute({
        ...body,
      });

      return response.json(classToClass(municipios));
    } catch (error) {
      if (process.env.NODE_ENV === 'dev') {
        return response.json(error);
      }
      return response.status(500).json('Erro interno');
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    const { id } = request.params;
    try {
      const updateMunicipio = container.resolve(UpdateMunicipioService);
      const municipios = await updateMunicipio.execute({
        id: parseInt(id, 10),
        ...body,
      });

      return response.json(classToClass(municipios));
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
      const removeMunicipio = container.resolve(RemoveMunicipioService);
      await removeMunicipio.execute(parseInt(id, 10));

      return response.json({ message: 'Municipio removed successfully' });
    } catch (error) {
      if (error instanceof AppError) response.json(error);

      if (process.env.NODE_ENV === 'dev') {
        return response.send(error);
      }

      return response.status(500).json('Erro interno');
    }
  }
}
