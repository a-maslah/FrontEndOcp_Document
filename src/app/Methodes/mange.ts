import {HttpErrorResponse} from "@angular/common/http";
import {ProcessusService} from "../services/processus.service";
import {SenderService} from "../services/sender.service";
import {ServiceService} from "../services/service.service";
import {Service} from "../modal/service";

export class Mange {

  public  serviceList: Service[]=[];
  constructor(public  processusService: ProcessusService,
              public serviceService: ServiceService) {


  }


  public  getService(): void{
    this.serviceService.getService().subscribe(
      (response)=>{
        this.serviceList=response;
        // console.log(response);
        //this.senderService.tempServiceList=this.serviceList;
      },
      (error :HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
}
