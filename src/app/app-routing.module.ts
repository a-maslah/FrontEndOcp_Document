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


const routes: Routes = [

  { path:"home", component: HomeComponent },



  { path:"nn", component: AppComponent },

  { path:"login", component: LoginComponent},

  { path:"testo", component: TestoComponent ,
    canActivate: [guard], data: {expectedRole : ['admin']}},

  { path:"gestion", component: GestionComponent,
    canActivate: [guard], data: {expectedRole : ['admin']} ,
    children: [
      { path:"processus", component: CoProcessusComponent,
        canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },
      { path:"documents",  component: CoDocumentsComponent,
        canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },
      { path:"users", component: CoUsersComponent,
        canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },
      { path:"services", component: CoServicesComponent,
        canActivate: [guard], data: {expectedRole : ['admin']} }

    ]
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
