import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

import {LoginComponent} from "./login/login.component";
import {CoUsersComponent} from "./co-users/co-users.component";
import {CoServicesComponent} from "./co-services/co-services.component";
import {CoProcessusComponent} from "./co-processus/co-processus.component";
import {CoDocumentsComponent} from "./co-documents/co-documents.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [

  { path:"", component: HomeComponent },

  { path:"users", component: CoUsersComponent},

  { path:"nn", component: AppComponent },

  { path:"login", component: LoginComponent},

  { path:"services", component: CoServicesComponent },

  { path:"processus", component: CoProcessusComponent },

  { path:"documents",  component: CoDocumentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
