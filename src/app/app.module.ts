import { NgModule } from '@angular/core';
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
    TestoComponent


  ],
    imports: [
        BrowserModule,
        AppRoutingModule, HttpClientModule, FormsModule,
        NgbModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,

        MatSelectModule,
        MatPaginatorModule,
        MatSortModule
        ,
        ReactiveFormsModule, NgSelectModule, NgMultiSelectDropDownModule, BrowserAnimationsModule, MatIconModule
    ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
