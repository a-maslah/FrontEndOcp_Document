import { Injectable } from '@angular/core';
import {Service} from "../modal/service";

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  public tempServiceList: Service[]=[];

  constructor() { }
}
