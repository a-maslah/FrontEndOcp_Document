import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/security/token.service";
import {User} from "../../modal/user";
import {UserProfile} from "../../dto/user-profile";




const USERNAME_KEY = 'AuthUserName';
const FIRSTNAME_KEY = 'AuthFirstName';
const LASTNAME_KEY = 'AuthLastName';
const PHONE_KEY = 'Phone';
const ADRESSE_KEY = 'Adresse';
const PROCESSUS_KEY = 'ProcessusName';
const EMAIL_KEY = 'Email';
const IMAGE_KEY = 'AuthImageName';


@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {


   user: UserProfile= new UserProfile();
   processusName!:string | null;
   authorites!:string[];


  constructor(private tokenService :TokenService) { }

  ngOnInit(): void {
    console.log("ngOninit")
    this.getDataUserLogin()

     }

     getDataUserLogin() : void{
       if (this.tokenService.getToken()){

         this.authorites=this.tokenService.getAuthorities();
         this.authorites.forEach(role => {
           if (role === 'ROLE_ADMIN') {
             this.user.role = 'Administrateur';
           }
           if (role === 'ROLE_Pilote') {
             this.user.role = 'Pilote de Processus';
           }
           if (role === 'ROLE_USER') {
             this.user.role = 'Employee';
           }
         });
         //this.user.role=sessionStorage.getItem()
         this.user.firstName=localStorage.getItem(FIRSTNAME_KEY);
         console.log(this.user.firstName+" local")

         this.user.lastName=localStorage.getItem(LASTNAME_KEY);
         this.user.profileImageUrl=sessionStorage.getItem(IMAGE_KEY);

         this.user.adresse=sessionStorage.getItem(ADRESSE_KEY);
         this.user.email=sessionStorage.getItem(EMAIL_KEY);
         this.user.phone=sessionStorage.getItem(PHONE_KEY);

         // @ts-ignore
         this.processusName=sessionStorage.getItem(PROCESSUS_KEY);

         //this.lastname=<string>sessionStorage.getItem(LASTNAME_KEY);

         // this.imageUrl=this.tokenService.getUser().imageUrl;
         // console.log(<string>sessionStorage.getItem(LASTNAME_KEY))
         // console.log(this.imageUrl)
         // this.role=this.tokenService.getAuthorities().

       }

     }

}
