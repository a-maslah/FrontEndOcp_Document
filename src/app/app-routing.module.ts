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


const routes: Routes = [

  { path:"", component: HomeComponent },

  { path:"users", component: CoUsersComponent,
    canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },

  { path:"nn", component: AppComponent },

  { path:"login", component: LoginComponent},

  { path:"services", component: CoServicesComponent,
    canActivate: [guard], data: {expectedRole : ['admin']} },


  { path:"processus", component: CoProcessusComponent,
    canActivate: [guard], data: {expectedRole : ['admin' , 'user']} },

  { path:"documents",  component: CoDocumentsComponent,
    canActivate: [guard], data: {expectedRole : ['admin' , 'user']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
