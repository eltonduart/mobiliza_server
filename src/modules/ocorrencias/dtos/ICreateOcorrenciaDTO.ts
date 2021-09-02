import IBasePessoaDTO from './IBaseOcorrenciaDTO';

export default interface ICreatePessoaDTO extends IBasePessoaDTO {
  pessoa_id?: number;
  descricao?: string;
  dta_previsao?: Date;
  concluido?: string;
  created_at?: Date;
  updated_at?: Date;
}
