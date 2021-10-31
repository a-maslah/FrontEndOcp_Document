import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Processus} from "../modal/processus";

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {

  private apiServerUrl=environment.host
  constructor(private http: HttpClient) { }

  public getProcessus(): Observable<Processus[]> {
    return this.http.get<Processus[]>(`${this.apiServerUrl}/processus/all`);
  }
}
