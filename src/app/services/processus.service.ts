import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Processus} from "../modal/processus";
import {Service} from "../modal/service";
import {User} from "../modal/user";

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {

  private host=environment.host
  constructor(private http: HttpClient) { }

  public getProcessusByService(service:Service): Observable<Processus[]> {
    return this.http.post<Processus[]>(`${this.host}/processus/by-service`,service);
  }

  public addProcessus(processus: Processus): Observable<Processus> {
    return this.http.post<Processus>(`${this.host}/processus/add`, processus);
  }
}
