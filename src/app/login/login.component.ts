import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/AuthService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username!: string ;
  password!: string;
  message: any;
  // errorMessage = "Invalid";
  // successMessage!: string
  // invalidLogin = false;
  // loginSuccess = false;


  constructor(private authService :AuthService) { }

  ngOnInit(): void {
  }

  doLogin(){

    let resp= this.authService.login(this.username,this.password);
    resp.subscribe(response=>{

      console.log(response)



    })

  }




}
