import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../modal/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ModalDismissReasons,NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-co-users',
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {



  public users :User[] ;
  public editUser!: User;
  public deleteUser!: User;

  constructor(public userService:UserService,
              private    modalService:NgbModal ) {
    this.users=[];
  }

  ngOnInit(): void {

    this.getUsers()
  }
  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }


  public onAddUser(addForm: NgForm): void{
    // @ts-ignore
    document.getElementById('add-user-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        this.getUsers();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




  public onOpenModalAddUser():void{
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


}
