import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedLanguage:any='en'
  success:boolean=false
  DemoResponse!:string
  errorResponse!:string
  error:boolean=false
  lang:any


  private translations: { [key: string]: { [key: string]: string } } = {};


  constructor(private route:Router,private translate:TranslateService, private data:DataService, private http:HttpClient, private contactService:ContactService,private elementRef: ElementRef, private service:AuthService){
    //translate.setDefaultLang('en')

  }

  ngOnInit(){
    this.loadTranslations('en');
    this.loadTranslations('ar');
    this.lang=this.selectedLanguage
  }

  login(credentials: NgForm): void {    
  
      this.service.login(credentials,this.selectedLanguage)
      .subscribe(response => {
        console.log('Login successful:');
        console.log(response);
        if(response.message){
          this.error = true
          this.errorResponse = response.message
        }else if(response.token){
            // put the token in the local storage 
            
            window.localStorage.setItem("token",response.token)
        credentials.reset
        this.success = true
          this.error=false
          this.errorResponse=''
          this.DemoResponse = this.getWelcomeMsg()
          setTimeout(() => {
            this.route.navigate(['/cpanel'])
          }, 1000);
        //this.route.navigate(['/cpanel'])
        
        }else{
          this.success = false
          this.DemoResponse = this.getErrorRegistered()
        }
        
        // Handle successful login
        
      }, error => {
        this.success = false
          this.DemoResponse = this.getErrorRegistered()
        // Handle login error
      });
    
  }

  switchLanguage(){
    if(this.selectedLanguage=='en'){
      this.selectedLanguage='ar'
    this.translate.use('ar')
    }else {
      this.selectedLanguage='en'
      this.translate.use('en')
    }
  }

  loadTranslations(language: string): void {
    const translationFileUrl = `../assets/i18n/${language}.json`;
    this.http.get<any>(translationFileUrl).subscribe(translations => {
      this.translations[language] = translations;
    });
  }

  updateTranslation(key: string, value: string, language: string): void {
    if (this.translations[language]) {
      this.translations[language][key] = value;
    }
  }

  getTranslation(key: string): string {
    if(this.selectedLanguage=='en'){
      return this.translations['en']?.[key] || key;
    }
    return this.translations['ar']?.[key] || key;
  }

  getPlaceholderText(): string {
    return this.getTranslation('PASSWORD');
  }

  getEmailPlaceholderText(){
    return this.getTranslation('EMAIL_PHONE');
  }

  getErrorRegistered(){
    return this.getTranslation('ERRORREGISTERED')
  }

  getWelcomeMsg(){
    return this.getTranslation('WELCOMEMSG')
  }

}
