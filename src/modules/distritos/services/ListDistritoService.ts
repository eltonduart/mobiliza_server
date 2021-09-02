import { injectable, inject } from 'tsyringe';
import Distrito from '@modules/distritos/infra/typeorm/entities/Distrito';
import IDistritosRepository from '../repositories/IDistritosRepository';

@injectable()
class ListDistritosService {
  constructor(
    @inject('DistritosRepository')
    private distritosRepository: IDistritosRepository,
  ) { }

  public async execute(query: any): Promise<Distrito[]> {
    const distritos = await this.distritosRepository.findAll(query);
    return distritos;
  }
}

export default ListDistritosService;
