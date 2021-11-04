import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Processus} from "../modal/processus";
import {Service} from "../modal/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private host = environment.host

  constructor(private http: HttpClient) {
  }

  public getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.host}/service/all`);
  }
}
