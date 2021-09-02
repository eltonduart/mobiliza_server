import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListOcorrenciasService from '@modules/ocorrencias/services/ListOcorrenciaService';
import CreateOcorrenciaService from '@modules/ocorrencias/services/CreateOcorrenciaService';
import UpdateOcorrenciaService from '@modules/ocorrencias/services/UpdateOcorrenciaService';
import RemoveOcorrenciaService from '@modules/ocorrencias/services/RemoveOcorrenciaService';
import AppError from '@shared/errors/AppError';

export default class PessoasController {
  async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;
    const listOcorrencias = container.resolve(ListOcorrenciasService);
    const ocorrencias = await listOcorrencias.execute(query);

    return response.json(classToClass(ocorrencias));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    try {
      const createOcorrencia = container.resolve(CreateOcorrenciaService);
      const ocorrencias = await createOcorrencia.execute({
        ...body,
      });

      return response.json(classToClass(ocorrencias));
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
      const updateOcorrencia = container.resolve(UpdateOcorrenciaService);
      const ocorrencias = await updateOcorrencia.execute({
        id: parseInt(id, 10),
        ...body,
      });

      return response.json(classToClass(ocorrencias));
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
      const removeOcorrencia = container.resolve(RemoveOcorrenciaService);
      await removeOcorrencia.execute(parseInt(id, 10));

      return response.json({ message: 'Ocorrencia removed successfully' });
    } catch (error) {
      if (error instanceof AppError) response.json(error);

      if (process.env.NODE_ENV === 'dev') {
        return response.send(error);
      }

      return response.status(500).json('Erro interno');
    }
  }
}
