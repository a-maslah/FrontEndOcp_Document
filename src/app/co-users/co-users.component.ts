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


export  interface PeriodicElement {

  name: string;
  position: number;
  weight: number;
  symbol: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-co-users',
  templateUrl: './co-users.component.html',
  styleUrls: ['./co-users.component.css']
})
export class CoUsersComponent implements OnInit {



  displayedColumns: string[] = ['firstName', 'lastName', 'email','roles', 'edit', 'delete'];
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



  public rolesList!: string[];
  private roleUser!: string;

  constructor(public processusService: ProcessusService, public userService:UserService,
              private    modalService:NgbModal ) {
    this.users=[];
  }

  ngOnInit(): void {
    this.getUsers();


    this.rolesList=['admin','user'];
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


  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        console.log(response)
        //this.dataSource.data = response;
        this.users = response;
        this.apiResponce = response
        this.dataSource.data=response;
        this.dataSource.paginator = this.paginator;


      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }


  public onAddUser(addForm: NgForm): void{
    // @ts-ignore

    document.getElementById('add-user-form').click();
    console.log(addForm.value);
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {

        console.log(addForm.value);
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


  changeUser($event: Event) {
    console.log($event)
  }

  onSubmit() {
console.log(this.user1)
  }


  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  onChange($event: any) {
    let filterData = _.filter(this.apiResponce,(item)=>{
      return item.processus.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filterData);
  }
}
