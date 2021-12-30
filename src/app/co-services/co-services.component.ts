import { Component, OnInit } from '@angular/core';
import {Service} from "../modal/service";
import {ServiceService} from "../services/service.service";
import {Processus} from "../modal/processus";
import {HttpErrorResponse} from "@angular/common/http";
import {SenderService} from "../services/sender.service";
import {NgForm} from "@angular/forms";
import {User} from "../modal/user";
import {ProcessusService} from "../services/processus.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {TokenService} from "../services/security/token.service";



@Component({
  selector: 'app-co-services',
  templateUrl: './co-services.component.html',
  styleUrls: ['./co-services.component.css']
})
export class CoServicesComponent implements OnInit {
  public serviceList: Service[];
  public editService!: Service;
  public deleteService!: Service;
  public allProcessusList: Processus[]=[];



  isAdmin = false;
  roles!: string[]

  // dropdownList = [];
  // selectedItems :Processus[]= [];
  // dropdownSettings!:IDropdownSettings




  constructor(private serviceService: ServiceService,private processusService : ProcessusService ,
              private senderService : SenderService,
              private tokenService: TokenService) {
    this.serviceList=[];
  }



  ngOnInit() {
    this.getService();
    this.roles=this.tokenService.getAuthorities();
    this.roles.forEach(role=>{

      if (role=== 'ROLE_ADMIN')
        this.isAdmin=true;
    })
   // this.isAdmin = this.tokenService.isAdmin();
  //  console.log(this.isAdmin + " admin")



    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'name',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };



//     let index= this.allProcessusList.findIndex(x => x.id ==5);
// //this will set value
//     this.selected= this.allProcessusList[index].id;
    // this.selected = [
    //   {id: 5, name: 'processus1'}
    //
    // ];

  }

  // onItemSelect(item: any) {
  //   console.log(item);
  //   console.log(this.selectedItems)
  //   this.editService.processusList=this.selectedItems;
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }



  public getService(): void{
    this.serviceService.getService().subscribe(
      (response)=>{
        this.serviceList=response;
        console.log(response);
        this.senderService.tempServiceList=this.serviceList;
      },
      (error :HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }


  onAddService(addForm: NgForm) {

    console.log(addForm.value);
    // @ts-ignore
    document.getElementById('add-service-form').click();
    this.serviceService.addService(addForm.value).subscribe(
      (response: Service) => {
        this.getService();
        //this.getProcessusByService(this.currentService);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }


  public checkProcessus(processusList: Processus[], pId : number) :boolean{
       return  processusList.some(el => el.id === pId);
  }


  public onOpenModalService(service:Service|null , mode:string): void{

    const container = document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add' ){
      button.setAttribute('data-target','#addServiceModal');
    }
    if (mode === 'edit' && service ){

      this.processusService.getAllProcessus().subscribe(
        (response: Processus[]) => {
          this.allProcessusList=response;
      });
      this.editService=service;
      button.setAttribute('data-target','#updateServiceModal');
    }
    if (mode === 'delete' && service){
      this.deleteService=service;
      button.setAttribute('data-target','#deleteServiceModal');
    }

    container!.appendChild(button);
    button.click();
  }

  public onDeleteService(serviceId: number) :void{

      this.serviceService.deleteService(serviceId).subscribe(
        (response: void) => {
          console.log(response);
          this.getService();
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }


  public onUpdateService(service: Service): void{
    //service.processusList=this.selectedItems;
    this.serviceService.updateService(service).subscribe(
      (response: Service) => {
        console.log(response);
        this.getService();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
