import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ValidateRegisterService from '@modules/users/services/ValidateRegisterService';

export default class ValidateRegisterController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const resetPasswordService = container.resolve(ValidateRegisterService);

    await resetPasswordService.execute({
      token,
    });

    return response.status(204).json();
  }
}
