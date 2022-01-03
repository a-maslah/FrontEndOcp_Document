import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../services/security/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserIntercepteurService implements HttpInterceptor{

  constructor(private tokenService: TokenService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token != null){
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(intReq) ;
  }


}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: UserIntercepteurService, multi: true}];

