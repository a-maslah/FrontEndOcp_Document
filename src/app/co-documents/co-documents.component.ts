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


@Component({
  selector: 'app-co-documents',
  templateUrl: './co-documents.component.html',
  styleUrls: ['./co-documents.component.css']
})
export class CoDocumentsComponent implements OnInit {



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
              private processusService: ProcessusService) {
  }

  ngOnInit(): void {
    this.getAllProcessus();
    this.dataFile.type_doc=this.sender.getMessage();

    this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);

    console.log("type document : " + this.dataFile.type_doc)

  }

  public temp(){
    this.ngOnInit()
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

    this.dataFile.processusId=this.processusCreate.id;
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile,this.dataFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
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
    this.dataFile.processusId=processusId;
    if (this.processusIdSelected==0)
      this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
    else
    this.fileInfos = this.uploadService.getFilesByTypeDocAndProcessus(this.dataFile);


  }

  changeApprove(app: boolean) {
    this.dataFile.approved=app;
    this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
  }
  approve!: Approve;
  id!:string
  onApprove(url:any) {
    let ids :string[] = url.split('/')
 //    this.id = ids[5]


   // console.log(this.id);
    this.approve= new Approve();

    this.approve.id=ids[5];


    // let varr ={
    //   id: id,
    // }
    //
    // const obj = JSON.parse(JSON.stringify(varr));
    // console.log(obj)
    console.log(this.approve.id+"    bbb");


    this.uploadService.onApprove(this.approve).subscribe(
      (response: any) => {

        console.log(response);

      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );


    this.fileInfos = this.uploadService.getFilesByTypeDoc(this.dataFile);
  }
}
