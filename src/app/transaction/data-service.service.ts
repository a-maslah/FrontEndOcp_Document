import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TokenService} from "../services/security/token.service";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  private loggedSource =new BehaviorSubject<boolean>(false);
  currentLogged = this.loggedSource.asObservable();
  constructor() { }

  changeLogged(isLogged: boolean){

    this.loggedSource.next(isLogged);

    localStorage.setItem("isLogged",'true');
  }


}
