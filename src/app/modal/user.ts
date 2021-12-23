import {Processus} from "./processus";

export class User {


  constructor(firstName: string, lastName: string, username: string, password: string, email: string, roles: string[]) {
    this._firstName = firstName;
    this._lastName = lastName;
    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = roles;

  }


  public  get firstName(): string {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }


  get profileImageUrl(): string {
    return this._profileImageUrl;
  }

  set profileImageUrl(value: string) {
    this._profileImageUrl = value;
  }

  id!: number ;
  private _firstName! : string;
  private _lastName! : string;
  username! : string;
  password! : string;
  email! : string;
  private _profileImageUrl! : string;
  roles: string[

    ];
  role!: string;
  processus!: Processus;


}
