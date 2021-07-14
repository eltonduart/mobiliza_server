import Municipio from '@modules/municipios/infra/typeorm/entities/Municipio';
import IMunicipiosRepository from '@modules/municipios/repositories/IMunicipiosRepository';
import ICreateMunicipioDTO from '@modules/municipios/dtos/ICreateMunicipioDTO';
import IUpdateMunicipioDTO from '@modules/municipios/dtos/IUpdateMunicipioDTO';

class MunicipiosRepository implements IMunicipiosRepository {
  private municipios: Municipio[] = [];

  public async findOne(nome: string): Promise<Municipio | undefined> {
    const findMunicipio = this.municipios.find(municipio => municipio.nome === nome);

    return findMunicipio;
  }

  public async findById(id: number): Promise<Municipio | undefined> {
    const findMunicipio = this.municipios.find(municipio => municipio.id === id);

    return findMunicipio;
  }

  public async findAll(): Promise<Municipio[]> {
    return this.municipios;
  }

  public async create(municipioData: ICreateMunicipioDTO): Promise<Municipio> {
    const municipio = new Municipio();

    Object.assign(municipio, { id: Math.random(), ...municipioData });

    await this.municipios.push(municipio);

    return municipio;
  }

  public async save(municipio: IUpdateMunicipioDTO): Promise<Municipio> {
    const municipioUpdated = new Municipio();

    const findMunicipio = this.municipios.find(m => m.id === municipio.id) || municipio;

    Object.assign(municipioUpdated, {
      ...findMunicipio,
      ...municipio,
    });

    return municipioUpdated;
  }

  public async remove(id: number): Promise<void> {
    this.municipios = this.municipios.filter(m => m.id !== id);
  }
}

export default MunicipiosRepository;
