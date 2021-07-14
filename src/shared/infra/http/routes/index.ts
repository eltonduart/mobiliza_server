import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import ensureAuthenticated from '@modules/users/infra/http/routes/middlewares/ensureAuthenticated';
import profileRouter from '@modules/users/infra/http/routes/profiles.routes';
import pessoasRouter from '@modules/pessoas/infra/http/routes/pessoas.routes';
import municipiosRouter from '@modules/municipios/infra/http/routes/municipios.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use(ensureAuthenticated);
routes.use('/profile', profileRouter);
routes.use('/pessoas', pessoasRouter);
routes.use('/municipios', municipiosRouter);

export default routes;
