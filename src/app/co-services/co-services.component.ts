import { Component, OnInit } from '@angular/core';
import {Service} from "../modal/service";
import {ServiceService} from "../services/service.service";
import {Processus} from "../modal/processus";
import {HttpErrorResponse} from "@angular/common/http";
import {SenderService} from "../services/sender.service";



@Component({
  selector: 'app-co-services',
  templateUrl: './co-services.component.html',
  styleUrls: ['./co-services.component.css']
})
export class CoServicesComponent implements OnInit {
  public serviceList: Service[];
  public editService!: Service;
  public deleteService!: Service;





  constructor(private serviceService: ServiceService, private senderService : SenderService) {
    this.serviceList=[];
  }



  ngOnInit() {
    this.getService();

  }
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

}
