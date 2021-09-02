import { getRepository, Repository } from 'typeorm';

import Distrito from '@modules/distritos/infra/typeorm/entities/Distrito';
import IDistritosRepository from '@modules/distritos/repositories/IDistritosRepository';
import ICreateDistritoDTO from '@modules/distritos/dtos/ICreateDistritoDTO';
import IUpdateDistritoDTO from '@modules/distritos/dtos/IUpdateDistritoDTO';

class DistritosRepository implements IDistritosRepository {
  private ormRepository: Repository<Distrito>;

  constructor() {
    this.ormRepository = getRepository(Distrito);
  }

  public async findOne(nome: string): Promise<Distrito | undefined> {
    const distrito = await this.ormRepository.findOne({ nome });

    return distrito;
  }

  public async findByField(
    field: string,
    value: any,
  ): Promise<Distrito | undefined> {
    const distrito = await this.ormRepository.findOne({ [field]: value });

    return distrito;
  }

  public async findAll(query: any): Promise<Distrito[]> {
    const distritos = await this.ormRepository.find(
      query && {
        where: `Distrito.nome ILIKE '%${query?.default || ''}%'
        `,
        order: {
          nome: 'ASC',
        },
      },
    );

    return distritos || [];
  }

  public async create(distritoData: ICreateDistritoDTO): Promise<Distrito> {
    const distrito = this.ormRepository.create(distritoData);

    await this.ormRepository.save(distrito);

    return distrito;
  }

  public async findById(id: number): Promise<Distrito | undefined> {
    const findEntity = await this.ormRepository.findOne({
      where: { id },
    });

    return findEntity || undefined;
  }

  public async save(distrito: IUpdateDistritoDTO): Promise<Distrito> {
    return this.ormRepository.save(distrito);
  }

  public async remove(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default DistritosRepository;
