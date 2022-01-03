import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../../dto/user-profile";
import {TokenService} from "../../services/security/token.service";
import {User} from "../../modal/user";
import {NgForm} from "@angular/forms";

const USERNAME_KEY = 'AuthUserName';
const FIRSTNAME_KEY = 'AuthFirstName';
const LASTNAME_KEY = 'AuthLastName';
const PHONE_KEY = 'Phone';
const ADRESSE_KEY = 'Adresse';
const PROCESSUS_KEY = 'ProcessusName';
const EMAIL_KEY = 'Email';
const IMAGE_KEY = 'AuthImageName';

@Component({
  selector: 'app-profiledit',
  templateUrl: './profiledit.component.html',
  styleUrls: ['./profiledit.component.css']
})
export class ProfileditComponent implements OnInit {

  userProfile: UserProfile= new UserProfile();
  user!: User;
  authorites!:string[];

  constructor(private tokenService :TokenService) { }

  ngOnInit(): void {
    this.getDataUserLogin()
    //console.log(this.user.getFirstName())
  }


  getDataUserLogin() : void{
    let user;
    if (this.tokenService.getToken()) {

      this.authorites = this.tokenService.getAuthorities();
      this.authorites.forEach(role => {
        if (role === 'ROLE_ADMIN') {
          this.userProfile.role = 'Administrateur';
        }
        if (role === 'ROLE_Pilote') {
          this.userProfile.role = 'Pilote de Processus';
        }
        if (role === 'ROLE_USER') {
          this.userProfile.role = 'Employee';
        }
      });
      //this.user.role=sessionStorage.getItem()
      this.userProfile.firstName = localStorage.getItem(FIRSTNAME_KEY);
      console.log(this.userProfile.firstName + " local")

      this.userProfile.lastName = localStorage.getItem(LASTNAME_KEY);
      this.userProfile.profileImageUrl = sessionStorage.getItem(IMAGE_KEY);

      this.userProfile.adresse = sessionStorage.getItem(ADRESSE_KEY);
      this.userProfile.email = sessionStorage.getItem(EMAIL_KEY);
      this.userProfile.phone = sessionStorage.getItem(PHONE_KEY);

      // @ts-ignore
      this.processusName = sessionStorage.getItem(PROCESSUS_KEY);

      this.user = new User(<string>this.userProfile.firstName, <string>this.userProfile.lastName, "", "",<string> this.userProfile.email, []);
      this.user.setPhone(<string>this.userProfile.phone);
      this.user.setAdresse(<string>this.userProfile.adresse);

      //this.lastname=<string>sessionStorage.getItem(LASTNAME_KEY);

      // this.imageUrl=this.tokenService.getUser().imageUrl;
      // console.log(<string>sessionStorage.getItem(LASTNAME_KEY))
      // console.log(this.imageUrl)
      // this.role=this.tokenService.getAuthorities().

    }

  }

  onEditUser(addForm: NgForm) {

  }
}
