import IBaseDistritoDTO from './IBaseDistritoDTO';

export default interface ICreateDistritoDTO extends IBaseDistritoDTO {
  nome: string;
  municipio_id: number;
}
