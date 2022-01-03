import {Processus} from "./processus";

export class User {


  constructor(firstName: string, lastName: string, username: string, password: string, email: string, roles: string[]) {
    this.firstname = firstName;
    this.lastname = lastName;
    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = roles;

  }


  getEmail(): string {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getPhone(): string {
    return this.phone;
  }

  setPhone(value: string) {
    this.phone = value;
  }

  getAdresse(): string {
    return this.adresse;
  }

  setAdresse(value: string) {
    this.adresse = value;
  }

  getProcessus(): Processus {
    return this.processus;
  }

  setProcessus(value: Processus) {
    this.processus = value;
  }

  public  getFirstName(): string {
    return this.firstname;
  }

  public setFirstName(value: string) {
    this.firstname = value;
  }

  public getLastName(): string {
    return this.lastname;
  }

  public setLastName(value: string) {
    this.lastname = value;
  }


  getProfileImageUrl(): string {
    return this.profileImageUrl;
  }



  setProfileImageUrl(value: string) {
    this.profileImageUrl = value;
  }

  id!: number ;
   firstname! : string;
   lastname! : string;
  username! : string;
  password! : string;
   email! : string;
   phone! : string;
   adresse!: string;

   profileImageUrl! : string;
  roles: any[

    ];
  role!: string;
   processus!: Processus;


}
