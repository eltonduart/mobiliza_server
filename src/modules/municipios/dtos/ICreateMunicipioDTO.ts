import IBaseMunicipioDTO from './IBaseMunicipioDTO';

export default interface ICreateMunicipioDTO extends IBaseMunicipioDTO {
  nome: string;
  cod_ibge: string;
}
