import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PessoasController from '../controllers/PessoaController';
import FindByPessoaController from '../controllers/FindPessoaByCPFController';
import ListPessoasColaboradorController from '../controllers/ListPessoaColaboradorController';

const pessoasRouter = Router();

const pessoasController = new PessoasController();
const findByPessoaController = new FindByPessoaController();
const listPessoasColaboradorController = new ListPessoasColaboradorController();

pessoasRouter.get('/owner', listPessoasColaboradorController.index);
pessoasRouter.get('/', pessoasController.index);
pessoasRouter.get('/:cpf', findByPessoaController.index);

pessoasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      apelido: Joi.string().required(),
      endereco: Joi.string().required(),
      bairro: Joi.string().required(),
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
      distrito_id: Joi.number().required(),
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
      nome: Joi.string().required(),
      apelido: Joi.string().required(),
      endereco: Joi.string().required(),
      bairro: Joi.string().required(),
      telefone: Joi.string().required(),
      dta_nascimento: Joi.date().required(),
      whatsapp: Joi.string().allow('').allow(null),
      instagran: Joi.string().allow('').allow(null),
      mae: Joi.string().allow('').required(),
      cpf: Joi.string().allow('').required(),
      facebook: Joi.string().allow('').allow(null),
      titulo: Joi.string().allow('').allow(null),
      zona_eleitoral: Joi.string().allow('').allow(null),
      secao_eleitoral: Joi.string().allow('').allow(null),
      tipo_usuario: Joi.string().required(),
      status: Joi.string().required(),
      municipio_id: Joi.number().required(),
      distrito_id: Joi.number().required(),
      owner_user_id: Joi.number(),
      email: Joi.string().allow().allow(null),
      password: Joi.string(),
    },
  }),
  pessoasController.update,
);

pessoasRouter.delete('/:id', pessoasController.remove);

export default pessoasRouter;
