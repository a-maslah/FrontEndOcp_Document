import { Component, OnInit } from '@angular/core';
import {Processus} from "../modal/processus";
import {ProcessusService} from "../services/processus.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CoServicesComponent} from "../co-services/co-services.component";
import {Service} from "../modal/service";
import {ServiceService} from "../services/service.service";
import {SenderService} from "../services/sender.service";
import {Mange} from "../Methodes/mange";
import {NgForm} from "@angular/forms";
import {User} from "../modal/user";

@Component({
  selector: 'app-co-processus',
  templateUrl: './co-processus.component.html',
  styleUrls: ['./co-processus.component.css']
})
export class CoProcessusComponent implements OnInit {
  public processusList: Processus[];
  public editProcessus!: Processus;
  public deleteProcessus!: Processus;
  public serviceList: Service[]=[];
  public currentService!:Service;
  public choix : boolean= false;
  public manage! : Mange;


  constructor(private processusService: ProcessusService, private senderService : SenderService,
              private serviceService: ServiceService) {
    this.processusList=[];

  }

  ngOnInit()  {
    this.getService();
  }



  // private getService():void {
  //   this.serviceList=this.senderService.tempServiceList;
  // }


  public getService(): void{
    this.serviceService.getService().subscribe(
      (response)=>{
        this.serviceList=response;
      },
      (error :HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }



  public onAddProcessus(addForm: NgForm): void{
    // @ts-ignore
    document.getElementById('add-processus-form').click();
    this.processusService.addProcessus(addForm.value).subscribe(
      (response: Processus) => {
        console.log(response);
        this.getProcessusByService(this.currentService);
        addForm.reset();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private getProcessusByService(service: Service) : void{
    this.processusService.getProcessusByService(service).subscribe(
      (response)=>{
        this.processusList=response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onGetProcessus(s: Service) {

    this.currentService=s;
    this.getProcessusByService(s);
    this.choix=true;
  }

  onOpenModalAddProcessus() {


  }
}
