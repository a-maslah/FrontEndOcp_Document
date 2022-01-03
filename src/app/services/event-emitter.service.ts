import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();
  subsVar!: Subscription;

  invokeCompLogin = new EventEmitter();
  subsVarLogin!: Subscription;

  constructor() { }

  onFirstComponentButtonClick(typeDoc:string) {
    this.invokeFirstComponentFunction.emit(typeDoc);
  }
  onFirstCompButtonLoginClick() {
    this.invokeCompLogin.emit();
  }

}
