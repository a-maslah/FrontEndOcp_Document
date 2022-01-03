import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FileUploadService} from "../services/file-upload.service";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {DataFile} from "../modal/data-file";
import {SenderService} from "../services/sender.service";
import {Processus} from "../modal/processus";
import {ProcessusService} from "../services/processus.service";
import {Approve} from "../modal/approve";
import {User} from "../modal/user";
import {EventEmitterService} from "../services/event-emitter.service";
import {TokenService} from "../services/security/token.service";


@Component({
  selector: 'app-co-documents',
  templateUrl: './co-documents.component.html',
  styleUrls: ['./co-documents.component.css']
})
export class CoDocumentsComponent implements OnInit {

  isEmploye = false;
  isAdmin: boolean = false;
  isPilote: boolean = false;

  nameProcessusForUser!: string | null

  roles!: string[]

  dataFile: DataFile = new DataFile()
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  processusList!: Processus[];
  processusIdSelected!: number;
  processusCreate!: Processus;

  constructor(private uploadService: FileUploadService,
              private sender: SenderService,
              private processusService: ProcessusService,
              private eventEmitterService: EventEmitterService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getAllProcessus();
    this.getRoleUser();
    this.dataFile.type_doc = this.sender.getMessage();



    if (this.isAdmin) {

      if (this.eventEmitterService.subsVar == undefined) {
        this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe((typeDoc: string) => {
          this.dataFile.type_doc = typeDoc;
          this.processusIdSelected=0;
          //this.changeTypeDoc(typeDoc);
          this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);


        });
      }

    }



    if (this.isEmploye) {

      if (this.eventEmitterService.subsVar == undefined) {
        this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe((typeDoc: string) => {
          this.dataFile.type_doc = typeDoc;
          this.nameProcessusForUser = sessionStorage.getItem('ProcessusName');
          this.dataFile.processusId = Number(sessionStorage.getItem('ProcessusID'));
          this.dataFile.approved = true;
          this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);


        });
      }

    }




    if (this.isPilote) {

      if (this.eventEmitterService.subsVar == undefined) {
        this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe((typeDoc: string) => {
          this.dataFile.type_doc = typeDoc;
          this.nameProcessusForUser = sessionStorage.getItem('ProcessusName');
          this.dataFile.processusId = Number(sessionStorage.getItem('ProcessusID'));
          this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);


        });
      }

    }


    //this.dataFile.type_doc=this.sender.getMessage();

    //this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);




  }
  //
  //               test!:string
  //                 ontest(){
  //   // // @ts-ignore
  //   // this.fileInfos.forEach(file=>{
  //   //   console.log(file)
  //   // })
  //
  //   this.fileInfos?.subscribe(event => {
  //     console.log(event)
  //     this.test=event['processusId'];
  //
  //     console.log(this.test)
  //
  //
  //   });
  // }

  getRoleUser() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(role => {
      if (role === 'ROLE_USER') {
        this.isEmploye = true;
      }
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (role === 'ROLE_PILOTE') {
        this.isPilote = true;
      }

    });
  }




  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  public getAllProcessus(): void {
    this.processusService.getAllProcessus().subscribe(
      (response) => {
        this.processusList = response;
        //console.log("processus: ")
        //console.log(this.processusList)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



  upload(addForm: NgForm): void {

    if (this.isAdmin)
    this.dataFile.processusId = this.processusCreate.id;
    if (this.isPilote)
      this.dataFile.processusId= Number(sessionStorage.getItem('ProcessusID'))


    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile, this.dataFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;

              if (this.isAdmin){
              this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
              this.processusIdSelected=0;
              this.dataFile.processusId=0
              }

              if (this.isPilote)
                this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile)
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;



          });

      }

      this.selectedFiles = undefined;
    }

    // @ts-ignore
    document.getElementById('add-document-form').click();
    addForm.reset();




  }







  onOpenModalAddDocument() {
    console.log("halim")
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addDocumentModal');
    container!.appendChild(button);
    button.click();
  }

  onAddDocument() {


  }

  onGetFiles(processusId: number) {

    if (this.isAdmin) {
      this.dataFile.processusId = processusId;
      if (this.processusIdSelected == 0)
        this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
      else
        this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);
    }





  }

  changeApprove(app: boolean) {
    if (this.isAdmin) {
      this.dataFile.approved = app;
      if (this.processusIdSelected==0 ) {
        this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
        console.log(true)
      }
      else
        this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);
      console.log(this.dataFile)

    }
    if (this.isPilote) {
      this.dataFile.approved = app;
      this.dataFile.processusId=Number(sessionStorage.getItem('ProcessusID'))
      this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);
      console.log(this.dataFile)
    }

    if (this.isEmploye) {
      // this.dataFile.approved = app;
      // this.dataFile.processusId=Number(sessionStorage.getItem('ProcessusID'))
      // this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);
      // console.log(this.dataFile)
    }
  }

  approve!: Approve;
  id!: string

  onApprove(url: any) {
    let ids: string[] = url.split('/')
    //    this.id = ids[5]


    // console.log(this.id);
    this.approve = new Approve();
    this.approve.id = ids[5];
    this.uploadService.onApprove(this.approve).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );


    if (this.isAdmin)
    this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
    if (this.isPilote){}

  }
}
