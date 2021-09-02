import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import DistritosController from '../controllers/DistritoController';

const distritosRouter = Router();

const distritosController = new DistritosController();

distritosRouter.get('/', distritosController.index);
distritosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      municipio_id: Joi.number().required(),
    },
  }),
  distritosController.create,
);

distritosRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      municipio_id: Joi.number().required(),
    },
  }),
  distritosController.update,
);

distritosRouter.delete('/:id', distritosController.remove);

export default distritosRouter;
