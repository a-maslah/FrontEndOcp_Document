import { Component, OnInit } from '@angular/core';
import {Processus} from "../modal/processus";
import {ProcessusService} from "../services/processus.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-co-processus',
  templateUrl: './co-processus.component.html',
  styleUrls: ['./co-processus.component.css']
})
export class CoProcessusComponent implements OnInit {
  public processusList: Processus[];
  public editProcessus!: Processus;
  public deleteProcessus!: Processus;

  constructor(private processusService: ProcessusService) {
    this.processusList=[];
  }

  ngOnInit()  {
    this.getProcessus();
  }

  private getProcessus() : void{
    this.processusService.getProcessus().subscribe(
      (response)=>{
        this.processusList=response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
