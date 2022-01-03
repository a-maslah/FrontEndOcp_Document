import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../modal/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ModalDismissReasons,NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Role} from "../modal/role";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Service} from "../modal/service";

import {Processus} from "../modal/processus";
import {ProcessusService} from "../services/processus.service";
import * as _ from 'lodash';
import {TokenService} from "../services/security/token.service";


export  interface PeriodicElement {

  name: string;
  position: number;
  weight: number;
  symbol: string;
}


interface MyObj {
  id: number;
  roleName: string;
}




@Component({
  selector: 'app-co-users',
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {



  displayedColumns: string[] = ['firstName', 'lastName', 'email','role', 'edit', 'delete'];
 // dataSource = ELEMENT_DATA;


  public users :User[] ;
   public user1 :User=new User("","","","","",[]);
  public editUser!: User;
  public deleteUser!: User;

  public processusList: Processus[] = [];

  processus!:Processus;
  roles!: Role;

  dataSource = new MatTableDataSource<User>();

  apiResponce:any = [];


  @ViewChild('paginator') paginator! : MatPaginator

  rolesUser!: string[]

  public rolesList!: string[];
  private roleUser!: string;
  isAdmin: boolean = false;
  isPilote: boolean = false;
   processusIdUser!: number;
   nameProcessusForUser!: string;

  constructor(public processusService: ProcessusService, public userService:UserService,
              private    modalService:NgbModal ,
              private tokenService: TokenService) {
    this.users=[];
  }

  ngOnInit(): void {
    this.getRoleUser();
    this.nameProcessusForUser =<string> sessionStorage.getItem('ProcessusName');
    this.processusIdUser = Number(sessionStorage.getItem('ProcessusID'));


    if (this.isAdmin)
    this.getUsers();
    else if (this.isPilote) {
      this.processusSelected = this.processusIdUser;
      this.onGetUsers(this.processusIdUser)
    }

    this.getProcessus();


    this.rolesList=['Administrateur','employee','pilote'];
  }


  getRoleUser() {
    this.rolesUser = this.tokenService.getAuthorities();
    this.rolesUser.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (role === 'ROLE_PILOTE') {
        this.isPilote = true;
      }

    });
  }




  public getProcessus(): void {
    this.processusService.getAllProcessus().subscribe(
      (response) => {
        this.processusList = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

rol!:string


  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[]) => {

        //this.dataSource.data = response;
        this.users = response;
        this.users.forEach((user:User)=> {

          user.roles.forEach(r=>{
            if (r.roleName==='ROLE_ADMIN'){
              user.role='Administrateur'
            }
            if (r.roleName==='ROLE_USER'){
              user.role='Employee'
            }
            if (r.roleName==='ROLE_PILOTE'){
              user.role='Pilote'
            }

          })


          // if (this.rol.indexOf("ROLE_USER")){
          //   user.role='Employee'
          //   console.log(this.rol)}
          // if (this.rol.indexOf("ROLE_PILOTE")){
          //   user.role='Pilote'
          //   console.log(this.rol)}

        });
        console.log(this.users)
        this.apiResponce = response
        this.dataSource.data=response;
        this.dataSource.paginator = this.paginator;


      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }


  public onAddUser(addForm: NgForm,user:User): void{


    // @ts-ignore
    document.getElementById('add-user-form').click();


    console.log(user);
    this.userService.addUser(this.user1).subscribe(
      (response: User) => {

      console.log(response)
        this.getUsers();
        addForm.reset();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onUpdateUser(user: User): void{

    this.userService.updateUser(user).subscribe(
      (response: User) => {

        this.getUsers();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUser(userId: number): void{

    this.userService.deleteUser(userId).subscribe(
      (response: void) => {

        this.getUsers();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




  public onOpenModalAddUser():void{
    this.getProcessus();
    const container = document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#addUserModal');
    container!.appendChild(button);
    button.click();
  }


  public onOpenModalUser(user:User , mode:string): void{

    const container = document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','#addUserModal');
    }
    if (mode === 'edit'){
      this.editUser=user;
      button.setAttribute('data-target','#updateUserModal');
    }
    if (mode === 'delete'){
      this.deleteUser=user;
      button.setAttribute('data-target','#deleteUserModal');
    }

    container!.appendChild(button);
    button.click();
  }




  // open(content:any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason:any) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  //
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  processusSelected!: number;





  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  onChange($event: any) {
    let filterData = _.filter(this.apiResponce,(item)=>{
      return item.processus.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filterData);
  }




  onGetUsers(p: any) {
    if (p==0){
      this.getUsers()
    }
    else
      this.getUsersByProcessus(p);
      //this.dataSource.data
  }

  onChangeProcessus(p: Processus) {
    this.user1.processus=p;

  }

  private getUsersByProcessus(pId: number) {
    this.userService.getUsersByProcessus(pId).subscribe(
      (response:User[]) => {
        this.dataSource.data = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
