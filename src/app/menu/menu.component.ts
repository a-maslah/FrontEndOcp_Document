import { Component, OnInit,Input } from '@angular/core';
import {TokenService} from "../services/security/token.service";
import {SenderService} from "../services/sender.service";
import {CoDocumentsComponent} from "../co-documents/co-documents.component";
import {EventEmitterService} from "../services/event-emitter.service";

const FIRSTNAME_KEY = 'AuthFirstName';
const LASTNAME_KEY = 'AuthLastName';
const IMAGE_KEY = 'AuthImageName';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {




  isAdminOrPilote = false;
  roles!: string[]



current: any;
  firstname!:string | null
  lastname!:string | null
  imageUrl!:string | null
  role!:string

  constructor(private tokenService :TokenService,
              private sender: SenderService,
              private eventEmitterService: EventEmitterService) {

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.firstname=localStorage.getItem(FIRSTNAME_KEY);
      this.lastname=localStorage.getItem(LASTNAME_KEY);

      this.imageUrl=sessionStorage.getItem(IMAGE_KEY);
      //this.lastname=<string>sessionStorage.getItem(LASTNAME_KEY);

     // this.imageUrl=this.tokenService.getUser().imageUrl;
     // console.log(<string>sessionStorage.getItem(LASTNAME_KEY))
      console.log(this.imageUrl)
      // this.role=this.tokenService.getAuthorities().

    }

    this.roles=this.tokenService.getAuthorities();
    this.roles.forEach(role=>{
      if (role=== 'ROLE_ADMIN' || role ==='ROLE_PILOTE')
        this.isAdminOrPilote=true;
    })


  }

  public onClick(m:string): void{
    this.current=m;
    console.log(this.current)
  }


  onClickSubmenu(type_doc: string) {
    this.onClick(type_doc)

    this.sender.setMessage(type_doc);
    this.eventEmitterService.onFirstComponentButtonClick(type_doc);
    //this.docCo.temp();
    console.log(type_doc)


  }
}
