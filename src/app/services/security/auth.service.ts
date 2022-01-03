import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewUser} from "../../modal/security/new-user";
import {Observable} from "rxjs";
import {LoginUser} from "../../modal/security/login-user";
import {JwtDTO} from "../../modal/security/jwt-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient ) { }

  // public newUser(newUser: NewUser): Observable<any>{
  //   return this.httpClient.post<any>(this.authURL + 'add' ,newUser);
  // }

  public login(loginUser: LoginUser): Observable<JwtDTO>{
      return  this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUser);
    }

}
