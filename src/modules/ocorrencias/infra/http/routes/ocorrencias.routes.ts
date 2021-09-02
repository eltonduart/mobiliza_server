import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OcorrenciasController from '../controllers/OcorrenciaController';

const ocorrenciasRouter = Router();

const ocorrenciasController = new OcorrenciasController();

ocorrenciasRouter.get('/', ocorrenciasController.index);
ocorrenciasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      pessoa_id: Joi.number().required(),
      descricao: Joi.string().required(),
      concluida: Joi.string().required(),
      dta_previsao: Joi.date(),
    },
  }),
  ocorrenciasController.create,
);

ocorrenciasRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      concluida: Joi.string().required(),
      dta_previsao: Joi.date(),
    },
  }),
  ocorrenciasController.update,
);

ocorrenciasRouter.delete('/:id', ocorrenciasController.remove);

export default ocorrenciasRouter;
