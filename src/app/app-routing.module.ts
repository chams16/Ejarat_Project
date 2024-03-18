import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEjaratComponent } from './main-ejarat/main-ejarat.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { CpanelComponent } from './component/cPanel/cpanel/cpanel.component';
import { UnitComponent } from './component/cPanel/unit/unit.component';
import { MaintenanceRequestComponent } from './component/cPanel/maintenance-request/maintenance-request.component';

const routes: Routes = [
    { path: 'home', component: MainEjaratComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cpanel', component:CpanelComponent},
  { path: 'unit', component: UnitComponent, outlet: "sidebar" },
  { path: 'maintenance', component: MaintenanceRequestComponent, outlet: "sidebar" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }