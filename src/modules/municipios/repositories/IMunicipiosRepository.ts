import Municipio from '../infra/typeorm/entities/Municipio';
import ICreateMunicipioDTO from '../dtos/ICreateMunicipioDTO';
import IUpdateMunicipioDTO from '../dtos/IUpdateMunicipioDTO';

export default interface IMunicipiosRepository {
  findAll(query?: any): Promise<Municipio[]>;
  findOne(nome: string): Promise<Municipio | undefined>;
  findById(id: number): Promise<Municipio | undefined>;
  create(municipioData: ICreateMunicipioDTO): Promise<Municipio>;
  save(municipio: IUpdateMunicipioDTO): Promise<Municipio>;
  remove(id: number): Promise<void>;
}
