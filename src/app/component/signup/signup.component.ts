import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnChanges{

  selectedLanguage:any='en'

  areas: any[] = []; // Assuming you have a list of areas fetched from the backend
  selectedArea: any
  selectedCity: any; // Property to store the selected area ID
  cities: any[] = [];
  condition:any
  agreeTerm:any
  success:boolean=false
  DemoResponse!:string


  private translations: { [key: string]: { [key: string]: string } } = {};


  constructor(private translate:TranslateService, private data:DataService, private http:HttpClient, private contactService:ContactService,private elementRef: ElementRef, private service:AuthService){
    translate.setDefaultLang('en')

  }

  ngOnInit(){
    this.loadTranslations('en');
    this.loadTranslations('ar');
    this.fetchAreas(this.selectedLanguage);
    this.fetchCondition(this.selectedLanguage)
  }
  ngOnChanges(){
    this.fetchAreas(this.selectedLanguage)
  }

  fetchCondition(lang:any){
    const apiconditionUrl = `http://164.90.138.198/api/app/terms?lang=${lang}`;
    this.http.get<any[]>(apiconditionUrl)
    .subscribe(response => {
      this.condition = response;
    });
  }

  fetchAreas(lang:any) {
    // Make HTTP request to fetch list of areas from backend API
    const apicitiesUrl = `http://164.90.138.198/api/app/cities?lang=${lang}`;
    console.log(apicitiesUrl);
    
    
    // Make HTTP request to fetch list of areas from backend API
    this.http.get<any[]>(apicitiesUrl)
      .subscribe(response => {
        this.areas = response;
      });
  }

  onAreaChange() {
    console.log(this.selectedArea.id);
    
    const apiUrl = `http://164.90.138.198/api/app/zones?lang=${this.selectedLanguage}?id=${this.selectedArea.id}`;
    // Fetch list of cities based on the selected area ID
    this.http.get<any[]>(apiUrl)
      .subscribe(cities => {
        console.log(apiUrl);
        
        console.log(this.selectedArea);
        
        this.cities = cities;
      });
  }

  signup(userData:NgForm): void {    
    console.log(userData);
    
    this.service.signup(userData)
      .subscribe(response => {
        console.log('Signup successful:', response);
        userData.reset
        this.success = true
          this.DemoResponse = 'Registered successfully! you can login now'
        // Handle successful signup
      }, error => {
        console.error('Signup failed:', error);
        userData.reset
        this.success = true
          this.DemoResponse = 'OOps! ther\'s an error try again'
        // Handle signup error
      });
  }

  switchLanguage(){
    if(this.selectedLanguage=='en'){
      this.selectedLanguage='ar'
      this.fetchCondition('ar')
      this.fetchAreas('ar')
      this.translate.use('ar')
    }else {
      this.selectedLanguage='en'
      this.fetchCondition('en')
      this.fetchAreas('en')
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
