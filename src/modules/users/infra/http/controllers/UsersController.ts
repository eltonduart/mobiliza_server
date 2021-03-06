import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.json(classToClass(user));
    } catch (error) {
      if (process.env.NODE_ENV === 'dev') {
        return response.json(error);
      }
      return response.status(500).json('Erro interno');
    }
  }
}
