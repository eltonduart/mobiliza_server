import Distrito from '../infra/typeorm/entities/Distrito';
import ICreateDistritoDTO from '../dtos/ICreateDistritoDTO';
import IUpdateDistritoDTO from '../dtos/IUpdateDistritoDTO';

export default interface IDistritosRepository {
  findAll(query?: any): Promise<Distrito[]>;
  findOne(nome: string): Promise<Distrito | undefined>;
  findById(id: number): Promise<Distrito | undefined>;
  findByField(field: string, value: any): Promise<Distrito | undefined>;
  create(distritoData: ICreateDistritoDTO): Promise<Distrito>;
  save(distrito: IUpdateDistritoDTO): Promise<Distrito>;
  remove(id: number): Promise<void>;
  findByOwner(owner_user_id: string): Promise<Distrito[]>;
}
