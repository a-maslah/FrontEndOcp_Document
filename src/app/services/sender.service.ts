import { Injectable } from '@angular/core';
import {Service} from "../modal/service";
import {CoDocumentsComponent} from "../co-documents/co-documents.component";

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  public tempServiceList: Service[]=[];

  public doc_type!: string;

  constructor() { }

  setMessage(typeDoc:string){
    this.doc_type=typeDoc;

  }
  getMessage(){
    return this.doc_type;
  }
}
