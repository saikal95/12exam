import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {PicsComponent} from "./pics/pics.component";
import {CreateItemComponent} from "./create-item/create-item.component";

const routes: Routes = [
  {path: 'create', component: CreateItemComponent },
  {path: '', component: PicsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
