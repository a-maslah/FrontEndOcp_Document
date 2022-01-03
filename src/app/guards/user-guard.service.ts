import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenService} from "../services/security/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate{

  realRole!: string;

  constructor(private tokenService: TokenService,
              private router: Router)
  { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const roles = this.tokenService.getAuthorities();
    this.realRole = 'user';
    roles.forEach(role => {
      if (role === 'ROLE_ADMIN'){
        this.realRole = 'admin';
      }

      if (role === 'ROLE_PILOTE'){
        this.realRole = 'pilote';
      }


    });
    if (!this.tokenService.getToken() || expectedRole.indexOf(this.realRole) === -1){
      this.router.navigate(['/']); // navigate to page "non authories"
      return false;
    }
  return true;

  }
}
