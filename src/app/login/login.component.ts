import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/security/auth.service';
import {TokenService} from "../services/security/token.service";
import {Router} from "@angular/router";
import {LoginUser} from "../modal/security/login-user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username!: string ;
  password!: string;
  errorMessage!: string;
  isLogged = false;
  isLoginFail = false;
  loginUser !: LoginUser;
  roles: string[]=[];




  constructor(
    private tokenService :TokenService,
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail =false;
      this.roles=this.tokenService.getAuthorities();
    }
  }

  onLogin() : void{
    this.loginUser = new LoginUser(this.username,this.password);
    this.authService.login(this.loginUser).subscribe(
      response => {
        this.isLogged = true;
        this.isLoginFail =false;
        this.tokenService.setToken(response.token);
        this.tokenService.setUserName(response.username);
        this.tokenService.setAuthorities(response.authorities);
        this.roles = response.authorities
        this.router.navigate(['/']);
      },
      error => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMessage = error.error.message;
        console.log(this.errorMessage)
      }
    );
  }









  // doLogin(){
  //
  //   let resp= this.authService.login(this.username,this.password);
  //   resp.subscribe(response=>{
  //
  //     console.log(response)
  //
  //
  //
  //   })
  //
  // }




}
