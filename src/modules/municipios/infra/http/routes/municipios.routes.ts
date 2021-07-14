import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import MunicipiosController from '../controllers/MunicipioController';

const municipiosRouter = Router();

const municipiosController = new MunicipiosController();

municipiosRouter.get('/', municipiosController.index);
municipiosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cod_ibge: Joi.string().required(),
    },
  }),
  municipiosController.create,
);

municipiosRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cod_ibge: Joi.string().required(),
    },
  }),
  municipiosController.update,
);

municipiosRouter.delete('/:id', municipiosController.remove);

export default municipiosRouter;
