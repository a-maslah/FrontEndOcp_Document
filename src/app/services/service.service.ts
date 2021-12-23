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
export class ServiceService {

  private host = environment.host

  constructor(private http: HttpClient) {
  }

  public getService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.host}/service/all`);
  }

  public addService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.host}/service/add`, service);
  }

  public deleteService(serviceId: number):Observable<void> {
    return this.http.delete<void>(`${this.host}/service/delete/${serviceId}`);
  }

  public updateService(service: Service):Observable<Service> {
    return this.http.put<Service>(`${this.host}/service/update`,service);
  }
}
