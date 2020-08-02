import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import {AboutusComponent} from './aboutus/aboutus.component';

const routes: Routes = [
  {path: 'aboutus', component: AboutusComponent},
    {path: 'register' , component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }