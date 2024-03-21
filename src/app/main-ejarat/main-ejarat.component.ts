import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as AOS from 'aos';




import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-main-ejarat',
  templateUrl: './main-ejarat.component.html',
  styleUrls: ['./main-ejarat.component.css']
})
export class MainEjaratComponent implements OnInit{
  selectedLanguage:any
  datafaq!:any[]
  basePrice=0
  proPrice=0
  premPrice=0
  DemoResponse:string=''
  success!:boolean

  activeAccordionItemIndex: number | null = null;



 setActiveAccordionItemIndex(index: number): void {
    if (this.activeAccordionItemIndex === index) {
      this.activeAccordionItemIndex = null; // Toggle accordion item if already active
    } else {
      this.activeAccordionItemIndex = index;
    }
  }

  private translations: { [key: string]: { [key: string]: string } } = {};

  constructor(private translate:TranslateService, private data:DataService, private http:HttpClient, private contactService:ContactService,private elementRef: ElementRef, private toastr:ToastrService){
    translate.setDefaultLang('en')
    this.fetchdata()

  }

  loadTranslations(language: string): void {
    const translationFileUrl = `/assets/i18n/${language}.json`;
    this.http.get<any>(translationFileUrl).subscribe(translations => {
      this.translations[language] = translations;
    });
  }

  ngOnInit(): void {
    AOS.init();
    this.switchLanguage()
      this.fetchfaqdata(this.selectedLanguage)
      this.loadTranslations('en');
    this.loadTranslations('ar');
    this.fetchdata()

  }

  scrollToElement(part:any): void {
    const element = document.getElementById(part);    
    if (element) {      
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
 

  updateTranslation(key: string, value: string, language: string): void {
    if (this.translations[language]) {
      this.translations[language][key] = value;
    }
  }

  switchLanguage(){
    if(this.selectedLanguage=='en'){
      this.selectedLanguage='ar'
      this.fetchfaqdata('ar')
    this.translate.use('ar')
    }else {
      this.selectedLanguage='en'
      this.fetchfaqdata('en')
    this.translate.use('en')
    }
  }

  fetchdata(){
    this.data.fetchPricingData().subscribe(response => {
      this.translations['en']['DOC1']=response[0].descriptionEn[0]
      this.translations['ar']['DOC1']=response[0].descriptionAr[0]
      this.translations['en']['DOC3']=response[0].descriptionEn[1]
      this.translations['ar']['DOC3']=response[0].descriptionAr[1]
      this.translations['en']['TEAM5']=response[0].descriptionEn[2]
      this.translations['ar']['TEAM5']=response[0].descriptionAr[2]
      this.translations['en']['LIMITED']=response[0].descriptionEn[3]
      this.translations['ar']['LIMITED']=response[0].descriptionAr[3]
      this.translations['en']['STARTUP']=response[0].nameEn
      this.translations['ar']['STARTUP']=response[0].nameAr

      this.translations['en']['DOC15']=response[1].descriptionEn[0]
      this.translations['ar']['DOC15']=response[1].descriptionAr[0]
      this.translations['en']['DOC10']=response[1].descriptionEn[1]
      this.translations['ar']['DOC10']=response[1].descriptionAr[1]
      this.translations['en']['TEAM25']=response[1].descriptionEn[2]
      this.translations['ar']['TEAM25']=response[1].descriptionAr[2]
      this.translations['en']['LIMITED']=response[1].descriptionEn[3]
      this.translations['ar']['LIMITED']=response[1].descriptionAr[3]
      this.translations['en']['PREMUIM']=response[1].nameEn
      this.translations['ar']['PREMUIM']=response[1].nameAr

      this.translations['en']['UNDOC']=response[2].descriptionEn[0]
      this.translations['ar']['UNDOC']=response[2].descriptionAr[0]
      this.translations['en']['UNREV']=response[2].descriptionEn[1]
      this.translations['ar']['UNREV']=response[2].descriptionAr[1]
      this.translations['en']['UNMEM']=response[2].descriptionEn[2]
      this.translations['ar']['UNMEM']=response[2].descriptionAr[2]
      this.translations['en']['UNLIMITED']=response[2].descriptionEn[3]
      this.translations['ar']['UNLIMITED']=response[2].descriptionAr[3]
      this.translations['en']['PRO']=response[2].nameEn
      this.translations['ar']['PRO']=response[2].nameAr

     this.basePrice = response[0].cost
     this.premPrice = response[1].cost
     this.proPrice = response[2].cost
      
      
      
      //translationFileUrl =response[0].descriptionAr[0]
    })
  }

  fetchfaqdata(lang:any){
    this.data.fetchFAqDat(lang).subscribe((response:any) => {
      this.datafaq=response
      
    })
  }

  getTranslation(key: string): string {
    if(this.selectedLanguage=='en'){
      return this.translations['en']?.[key] || key;
    }
    return this.translations['ar']?.[key] || key;
  }

  submitForm(myForm:NgForm): void {
    if (myForm.valid) {
      const formData = {
        guestName:myForm.value.name,
        mobile: myForm.value.phone,
        message: myForm.value.message
      };
      this.contactService.sendContactForm(formData).subscribe(
        response => {
          console.log('Form submission successful:', response);
          // Optionally, reset the form after successful submission
          myForm.reset();
        },
        error => {
          console.error('Form submission failed:', error);
          // Handle error
        }
      );
    }
  }



  submitDemoForm(myDemoForm:NgForm){

    if (myDemoForm.valid) {
      const formData = {
        guestName:myDemoForm.value.name,
        mobile: myDemoForm.value.phone,
        email: myDemoForm.value.email
      };
      this.contactService.sendDemoForm(formData).subscribe(
        response => {
          console.log('Form submission successful:', response);
          // Optionally, reset the form after successful submission
         
          console.log("test");
          myDemoForm.reset()
          this.success = true
          this.DemoResponse = 'Demo Request submitted successfully!'
          
          
        },
        error => {
          console.error('Form submission failed:', error);
          // Handle error
          this.success = false
          this.DemoResponse = "Oops ther's an error try again"
        }
      );
    }
  }

  

}
