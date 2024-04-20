import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/DataType/Contact';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  accounts:Contact []= [];
  filteredAccounts: any[];
  contactData: any = {};
  token: string | null = null;

  selectedId!: any;
  selectedBankId:any
  selectedNationalityValue!:any
  NationalitiesValue!:any[]
  ContactTypeValues!: any[]
  BankValues!:any[]


  showAdditionalFields: boolean = false;

  constructor(private data:DataService,private route:Router) {
      // Initialize filtered accounts with all accounts initially
      this.filteredAccounts = this.accounts;
  }

  ngOnInit(): void {
      // Retrieve token from localStorage
    this.token = localStorage.getItem('token');
    console.log("token",this.token);
    this.fetchContactTypeValues()
    this.fetchNationalitiesValues()
    
    if (this.token) {
      console.log("test");
      
      this.getContacts();
    } else {
      // Handle case where token is not available (e.g., redirect to login)
    }
  }

  getContacts() {
    this.data.getContacts(this.token!).subscribe(response => {
      if(response.message){
        this.route.navigate(['/login'])
      }
     this.filteredAccounts=response
     this.accounts=response
    }, error => {
      console.error('Error:', error);
      this.handleApiError(error);
    });
  }

  fetchContactTypeValues() {
    this.data.fetchContactTypeValues(this.token!).subscribe(values => {      
      this.ContactTypeValues = values;
      
    });
  }

  fetchNationalitiesValues() {
    this.data.fetchNationalitiesValues(this.token!).subscribe(values => {      
      this.NationalitiesValue = values;
      
    });
  }

  fetchBankValues() {
    this.data.fetchBankValues(this.token!).subscribe(values => {      
      this.BankValues = values;
      
    });
  }

  toggleAdditionalFields(): void {
    this.showAdditionalFields = !this.showAdditionalFields;
    this.fetchBankValues()
  }

  filterAccounts(event: any) {
    const searchTerm = event.target.value;
    // Filter accounts based on account name
    this.filteredAccounts = this.accounts.filter(account => {
        return (account.nameAr.toLowerCase().includes(searchTerm.toLowerCase())|| account.nameEn.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }


  addContact(form: any): void {
    const formDataWithToken = { ...form.value, token: this.token };
    if (form.valid) {
      // Submit the form data to the backend API
      const formData = form.value;
      console.log(formData); // For testing, remove this line after testing
      this.data.addContact(formDataWithToken).subscribe(response => {
        console.log('Account added successfully:', response);
        // Optionally, refresh account list after adding
        this.getContacts();
        // Clear form after successful addition
        form.reset;
      }, error => {
        console.error('Error:', error);
        this.handleApiError(error);
      });
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
    /**/
  }

  getAccountById(id: number) {
    /*this.data.getAccountById(id).subscribe(response => {
      console.log('Account:', response);
    }, error => {
      console.error('Error:', error);
      this.handleApiError(error);
    });*/
  }





  handleApiError(error: any) {
    if (error.error && (error.error.message === 'Session Is Expired' || error.error.message === 'Token Is Invalid')) {
      // Handle session or token expiration here (e.g., redirect to login)
    }
  }

}
