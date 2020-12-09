export class Users {
  public id: number;
  public password: string;
  public email: string;

  constructor(id: number, password: string, email: string) {
    this.id = id;
    this.password = password;
    this.email = email;
  }
}
