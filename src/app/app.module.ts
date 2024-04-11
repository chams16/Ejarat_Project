import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { MainEjaratComponent } from './main-ejarat/main-ejarat.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { ROUTES, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SideBarComponent } from './component/cPanel/side-bar/side-bar.component';
import { NavbarComponent } from './component/cPanel/navbar/navbar.component';
import { FooterComponent } from './component/cPanel/footer/footer.component';
import { CpanelComponent } from './component/cPanel/cpanel/cpanel.component';
import { UnitComponent } from './component/cPanel/unit/unit.component';
import { MaintenanceRequestComponent } from './component/cPanel/maintenance-request/maintenance-request.component';
import { ChartAccountComponent } from './component/cPanel/chart-account/chart-account.component';
import { ContactComponent } from './component/cPanel/contact/contact.component';

export function HTTPLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainEjaratComponent,
    SignupComponent,
    LoginComponent,
    SideBarComponent,
    NavbarComponent,
    FooterComponent,
    CpanelComponent,
    UnitComponent,
    MaintenanceRequestComponent,
    ChartAccountComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HTTPLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
