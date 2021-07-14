import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PessoasController from '../controllers/PessoaController';

const pessoasRouter = Router();

const pessoasController = new PessoasController();

pessoasRouter.get('/', pessoasController.index);
pessoasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      apelido: Joi.string().required(),
      endereco: Joi.string().required(),
      telefone: Joi.string().required(),
      dta_nascimento: Joi.date().required(),
      whatsapp: Joi.string().allow(''),
      instagran: Joi.string().allow(''),
      mae: Joi.string().allow('').required(),
      cpf: Joi.string().allow('').required(),
      facebook: Joi.string().allow(''),
      titulo: Joi.string().allow(''),
      zona_eleitoral: Joi.string().allow(''),
      secao_eleitoral: Joi.string().allow(''),
      tipo_usuario: Joi.string().required(),
      status: Joi.string().required(),
      municipio_id: Joi.number().required(),
      owner_user_id: Joi.number(),
      email: Joi.string().allow(),
      password: Joi.string(),
    },
  }),
  pessoasController.create,
);

pessoasRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string(),
      apelido: Joi.string(),
      endereco: Joi.string(),
      telefone: Joi.string(),
      dta_nascimento: Joi.date(),
      whatsapp: Joi.string(),
      instagran: Joi.string(),
      mae: Joi.string(),
      cpf: Joi.string(),
      email: Joi.string(),
      facebook: Joi.string(),
      titulo: Joi.string(),
      zona_eleitoral: Joi.string(),
      secao_eleitoral: Joi.string(),
      tipo_usuario: Joi.string(),
      status: Joi.string(),
      municipio_id: Joi.number(),
    },
  }),
  pessoasController.update,
);

pessoasRouter.delete('/:id', pessoasController.remove);

export default pessoasRouter;
