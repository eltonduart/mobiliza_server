import Distrito from '@modules/distritos/infra/typeorm/entities/Distrito';
import IDistritosRepository from '@modules/distritos/repositories/IDistritosRepository';
import ICreateDistritoDTO from '@modules/distritos/dtos/ICreateDistritoDTO';
import IUpdateDistritoDTO from '@modules/distritos/dtos/IUpdateDistritoDTO';

class DistritosRepository implements IDistritosRepository {
  private distritos: Distrito[] = [];

  public async findOne(name: string): Promise<Distrito | undefined> {
    const findDistrito = this.distritos.find(distrito => distrito.nome === name);

    return findDistrito;
  }

  public async findById(id: number): Promise<Distrito | undefined> {
    const findDistrito = this.distritos.find(distrito => distrito.id === id);

    return findDistrito;
  }

  public async findAll(): Promise<Distrito[]> {
    return this.distritos;
  }

  public async create(distritoData: ICreateDistritoDTO): Promise<Distrito> {
    const distrito = new Distrito();

    Object.assign(distrito, { id: Math.random(), ...distritoData });

    await this.distritos.push(distrito);

    return distrito;
  }

  public async save(distrito: IUpdateDistritoDTO): Promise<Distrito> {
    const distritoUpdated = new Distrito();

    const findDistrito = this.distritos.find(m => m.id === distrito.id) || distrito;

    Object.assign(distritoUpdated, {
      ...findDistrito,
      ...distrito,
    });

    return distritoUpdated;
  }

  public async remove(id: number): Promise<void> {
    this.distritos = this.distritos.filter(m => m.id !== id);
  }
}

export default DistritosRepository;
