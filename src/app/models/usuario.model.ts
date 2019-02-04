export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public clave: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string,
  ){}

}
