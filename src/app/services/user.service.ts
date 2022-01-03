import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../modal/user";
import {Observable} from "rxjs";
import {Processus} from "../modal/processus";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.host;
  constructor(private http:HttpClient) {}


  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.host}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/new`, user);
  }

  updateUser(user: User):Observable<User> {
    return this.http.put<User>(`${this.host}/user/update`,user);
  }

  deleteUser(userId: number):Observable<void> {
    return this.http.delete<void>(`${this.host}/user/delete/${userId}`);
  }


    getUsersByProcessus(pId: number):Observable<User[]> {
      return this.http.post<User[]>(`${this.host}/user/by-processus`,pId);

    }
}
