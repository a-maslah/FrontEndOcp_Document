import { Component, OnInit } from '@angular/core';
import {TokenService} from "../services/security/token.service";
import {DataServiceService} from "../transaction/data-service.service";
import {EventEmitterService} from "../services/event-emitter.service";

const FIRSTNAME_KEY = 'AuthFirstName';
const LASTNAME_KEY = 'AuthLastName';
const IMAGE_KEY = 'AuthImageName';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  firstname!:string | null
  lastname!:string | null
  imageUrl!:string | null

  isLogged = true;
  constructor(private  tokenService: TokenService,
              private dataLogged: DataServiceService,
              private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit(): void {
    this.dataLogged.currentLogged.subscribe(isLogged => this.isLogged=isLogged);
    console.log(this.isLogged)
    if (localStorage.getItem("isLogged")=='true')
      this.isLogged=true;


    if (this.eventEmitterService.subsVarLogin == undefined) {
      this.eventEmitterService.subsVarLogin = this.eventEmitterService.invokeCompLogin.subscribe((name:string)=>{



        if (this.tokenService.getToken()){

          this.firstname=localStorage.getItem(FIRSTNAME_KEY);
          this.lastname=localStorage.getItem(LASTNAME_KEY);
          console.log(this.firstname)
          this.imageUrl=sessionStorage.getItem(IMAGE_KEY);
          //this.lastname=<string>sessionStorage.getItem(LASTNAME_KEY);

          // this.imageUrl=this.tokenService.getUser().imageUrl;
          // console.log(<string>sessionStorage.getItem(LASTNAME_KEY))
          console.log(this.firstname)
          // this.role=this.tokenService.getAuthorities().

        }

      });
    }



  }

  ontest(){
    console.log(this.isLogged)
  }






  onLogOut() : void{
    this.isLogged=false;
    this.tokenService.logOut();

    window.location.reload();
  }
}
