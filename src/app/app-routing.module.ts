import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

import {LoginComponent} from "./login/login.component";
import {CoUsersComponent} from "./co-users/co-users.component";
import {CoServicesComponent} from "./co-services/co-services.component";
import {CoProcessusComponent} from "./co-processus/co-processus.component";
import {CoDocumentsComponent} from "./co-documents/co-documents.component";
import {HomeComponent} from "./home/home.component";
import {UserGuardService as guard} from "./guards/user-guard.service";
import {GestionComponent} from "./gestion/gestion.component";
import {TestoComponent} from "./testo/testo.component";
import {ProfileviewComponent} from "./profileview/profileview.component";


const routes: Routes = [

  { path:"home", component: HomeComponent },



  { path:"nn", component: AppComponent },

  { path:"login", component: LoginComponent},



  { path:"gestion", component: GestionComponent,
    canActivate: [guard], data: {expectedRole : ['admin','user']} ,
    children: [
      { path:"processus", component: CoProcessusComponent,
        canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },
      { path:"documents",  component: CoDocumentsComponent,
        canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },
      { path:"users", component: CoUsersComponent,
        canActivate: [guard], data: {expectedRole : ['admin']} },
      { path:"services", component: CoServicesComponent,
        canActivate: [guard], data: {expectedRole : ['admin', 'user']} },
      { path:"testo", component: ProfileviewComponent ,
        canActivate: [guard], data: {expectedRole : ['admin','user']}}

    ]
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
