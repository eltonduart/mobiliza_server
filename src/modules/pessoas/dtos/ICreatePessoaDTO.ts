import IBasePessoaDTO from './IBasePessoaDTO';

export default interface ICreatePessoaDTO extends IBasePessoaDTO {
  nome: string;
  endereco: string;
  municipio_id: number;
  dta_nascimento?: Date;
  owner_user_id?: number;
  email?: string;
  password?: string;
}
