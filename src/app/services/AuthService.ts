import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  // public username!: string;
  // public password!: string;



  constructor(private  http: HttpClient) {}

  // public login(username: string , password :string){
  //   const headers = new HttpHeaders({Authorization: 'Basic'+btoa(username + ":" + password)})
  //   console.log(username);
  //   console.log(password);
  //   return this.http.get(environment.host,
  //     {headers,responseType:'text' as 'json'})
  // }
  // public getUsers(){
  //  let username = "javatechie";
  //  let password = "jt143";
  //   const headers = new HttpHeaders({Authorization: 'Basic'+btoa( username + ":" + password )})
  //   return this.http.get(environment.host + `/getUsers`,
  //     {headers});
  //
  // }

}
