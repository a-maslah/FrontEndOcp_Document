import {Processus} from "../modal/processus";

export class UserProfile {

  private _firstName! : string |null;
  private _lastName! : string|null;
  private _username! : string|null ;

  private _email! : string|null;
  private _phone! : string|null;
  private _adresse!: string|null;

  private _role!: string|null;

  private _profileImageUrl! : string|null;
  private _processus!: Processus |null;


  get processus(): Processus | null {
    return this._processus;
  }

  set processus(value: Processus | null) {
    this._processus = value;
  }

  get role(): string | null {
    return this._role;
  }

  set role(value: string | null) {
    this._role = value;
  }




  constructor() {
  }


  get firstName(): string | null {
    return this._firstName;
  }

  set firstName(value: string | null) {
    this._firstName = value;
  }

  get lastName(): string | null {
    return this._lastName;
  }

  set lastName(value: string | null) {
    this._lastName = value;
  }

  get username(): string | null {
    return this._username;
  }

  set username(value: string | null) {
    this._username = value;
  }

  get email(): string | null {
    return this._email;
  }

  set email(value: string | null) {
    this._email = value;
  }

  get phone(): string | null {
    return this._phone;
  }

  set phone(value: string | null) {
    this._phone = value;
  }

  get adresse(): string | null {
    return this._adresse;
  }

  set adresse(value: string | null) {
    this._adresse = value;
  }

  get profileImageUrl(): string | null {
    return this._profileImageUrl;
  }

  set profileImageUrl(value: string | null) {
    this._profileImageUrl = value;
  }

}
