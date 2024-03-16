import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEjaratComponent } from './main-ejarat/main-ejarat.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
    { path: 'home', component: MainEjaratComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }