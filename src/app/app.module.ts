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
    HomeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,
    NgbModule,
    FormsModule
    ,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
