import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataFile} from "../modal/data-file";
import {Service} from "../modal/service";
import {Processus} from "../modal/processus";
import {Approve} from "../modal/approve";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File,dataFile: DataFile): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    //dataFile.type_doc='fiche';

    formData.append('file', file);
    formData.append('description',JSON.stringify(dataFile.description));
    formData.append('type_doc',JSON.stringify(dataFile.type_doc));
    formData.append('processusId',JSON.stringify(dataFile.processusId))
    console.log(formData);
    const req = new HttpRequest('POST', `${this.baseUrl}/resources/upload`,formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/resources/files`);
  }

  // public getFilesByTypeDoc(type_doc:string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/resources/filestype`,type_doc);
  // }
   getFilesByTypeDoc(dataFile: DataFile):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resources/filestype/`,dataFile);
  }

  getFilesByTypeDocAndProcessus(dataFile: DataFile):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resources/filesprocessus/`,dataFile);
  }

  onApprove (approve: Approve): Observable<any>{
    console.log("babafood");
    //console.log(JSON.parse(id,))
    console.log(approve)

     return this.http.post<any>(`${this.baseUrl}/resources/approve`,approve);


  }
}
