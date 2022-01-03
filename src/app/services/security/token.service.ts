import { Injectable } from '@angular/core';
import {User} from "../../modal/user";
import {UserProfile} from "../../dto/user-profile";



const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const FIRSTNAME_KEY = 'AuthFirstName';
const LASTNAME_KEY = 'AuthLastName';
const PHONE_KEY = 'Phone';
const ADRESSE_KEY = 'Adresse';
const PROCESSUSNAME_KEY = 'ProcessusName';
const PROCESSUSID_KEY = 'ProcessusID';
const EMAIL_KEY = 'Email';
const IMAGE_KEY = 'AuthImageName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];
  private _user!: User



  constructor() { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string{
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }


  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public setUserName(username: string): void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }

  public getUserName(): string{
    return <string>sessionStorage.getItem(USERNAME_KEY);
  }

  // public setUser(user: User): void{
  //   window.sessionStorage.removeItem(FIRSTNAME_KEY);
  //   window.sessionStorage.setItem(FIRSTNAME_KEY,user.firstName);
  //
  //   window.sessionStorage.removeItem(LASTNAME_KEY);
  //   window.sessionStorage.setItem(LASTNAME_KEY,user.lastName);
  //   window.sessionStorage.removeItem(IMAGE_KEY);
  //   window.sessionStorage.setItem(IMAGE_KEY,user.profileImageUrl);
  // }


  public setUserProfile(user: UserProfile):void{
    localStorage.removeItem(FIRSTNAME_KEY);
    localStorage.setItem(FIRSTNAME_KEY,<string>user.firstName);
    localStorage.removeItem(LASTNAME_KEY);
    localStorage.setItem(LASTNAME_KEY,<string>user.lastName);
    window.sessionStorage.removeItem(IMAGE_KEY);
    window.sessionStorage.setItem(IMAGE_KEY,<string>user.profileImageUrl);

    window.sessionStorage.removeItem(PHONE_KEY);
    window.sessionStorage.setItem(PHONE_KEY,<string>user.phone);
    window.sessionStorage.removeItem(ADRESSE_KEY);
    window.sessionStorage.setItem(ADRESSE_KEY,<string>user.adresse);
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY,<string>user.email);

    if (user.processus) {
      window.sessionStorage.removeItem(PROCESSUSNAME_KEY);
      window.sessionStorage.setItem(PROCESSUSNAME_KEY, user.processus.name);
      window.sessionStorage.removeItem(PROCESSUSID_KEY);
      window.sessionStorage.setItem(PROCESSUSID_KEY,String(user.processus.id));
    }

  }



  // public getUser(): User{
  //   user: User;
  //   console.log(<string>sessionStorage.getItem(FIRSTNAME_KEY))
  //   this._user.firstName=<string>sessionStorage.getItem(FIRSTNAME_KEY);
  //
  //   this._user.lastName=<string>sessionStorage.getItem(LASTNAME_KEY);
  //   this._user.imageUrl=<string>sessionStorage.getItem(IMAGE_KEY);
  //   return this._user
  // }

  public setAuthorities(authorities: string[]): void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));

  }

  public getAuthorities(): string []{
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(<string> sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority :any) =>{
        this.roles.push(authority.authority)
      });

    }
    return this.roles;
  }
  public logOut(): void{
    window.sessionStorage.clear();
    sessionStorage.clear();
    window.localStorage.clear()
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {

      return false;
    }
    const token = this.getToken();

    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    console.log(values)
    const roles = values.roles;

    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }
}
