export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  blocked?: boolean;
  pessoa_id?: number;
}
