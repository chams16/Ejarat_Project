import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from 'src/app/services/contact.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  selectedLanguage:any


  private translations: { [key: string]: { [key: string]: string } } = {};


  constructor(private translate:TranslateService, private data:DataService, private http:HttpClient, private contactService:ContactService,private elementRef: ElementRef){
    translate.setDefaultLang('en')

  }

  ngOnInit(){
    this.loadTranslations('en');
    this.loadTranslations('ar');
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
    const translationFileUrl = `/assets/i18n/${language}.json`;
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

  getBARPlaceHolder(){
    return this.getTranslation('BUISSNESSARABE')
  }
  getBENPlaceHolder(){
    return this.getTranslation('BUISINESSENGLISH')
  }

  getFullENPlaceHolder(){
    return this.getTranslation('FULLNAMEEN')
  }
  getFullARPlaceHolder(){
    return this.getTranslation('FULLNAMEAR')
  }

  getEmailPlaceHolder(){
    return this.getTranslation('MAILREQ')
  }
  getPhonePlaceHolder(){
    return this.getTranslation('YOURPHONE')
  }

  getCountryPlaceHolder(){
    return this.getTranslation('COUNTRY')
  }
  getCityPlaceHolder(){
    return this.getTranslation('CITY')
  }

  getPasswordPlaceHolder(){
    return this.getTranslation('PASSWORD')
  }

  getRePasswordPlaceHolder(){
    return this.getTranslation('REPASSWORD')
  }

}
