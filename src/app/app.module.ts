import {EventEmitter, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CoServicesComponent } from './co-services/co-services.component';
import { CoDocumentsComponent } from './co-documents/co-documents.component';
import { CoProcessusComponent } from './co-processus/co-processus.component';
import {CoUsersComponent} from "./co-users/co-users.component";
import {AuthService} from "./services/AuthService";
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {interceptorProvider} from "./intercepteur/user-intercepteur.service";
import { GestionComponent } from './gestion/gestion.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { TestoComponent } from './testo/testo.component';
import {SenderService} from "./services/sender.service";
import { ProfileviewComponent } from './gestion/profileview/profileview.component';
import {ButtonsModule, InputsModule, WavesModule} from "angular-bootstrap-md";
import { ProfileditComponent } from './gestion/profiledit/profiledit.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DetailProcessusComponent } from './detail-processus/detail-processus.component';
import { DetailServiceComponent } from './detail-service/detail-service.component';
import {EventEmitterService} from "./services/event-emitter.service";




@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    CoServicesComponent,
    CoDocumentsComponent,
    CoProcessusComponent,
    CoUsersComponent,
    NavbarComponent,
    MenuComponent,
    HomeComponent,
    GestionComponent,
    TestoComponent,
    ProfileviewComponent,
    ProfileditComponent,
    ContactComponent,
    AboutComponent,
    DetailProcessusComponent,
    DetailServiceComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule,
    NgbModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    InputsModule,
    WavesModule,
    ButtonsModule,

    MatSelectModule,
    MatPaginatorModule,
    MatSortModule
    ,
    ReactiveFormsModule, NgSelectModule, NgMultiSelectDropDownModule, BrowserAnimationsModule, MatIconModule, InputsModule, InputsModule
  ],
  providers: [interceptorProvider,EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
