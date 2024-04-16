import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Account } from 'src/app/DataType/Accounts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart-account',
  templateUrl: './chart-account.component.html',
  styleUrls: ['./chart-account.component.css']
})
export class ChartAccountComponent implements OnInit{
  accounts:Account[] = [];
  filteredAccounts: any[];
  accountData: any = {};
  token: string | null = null;
  errorResponse!:string
  error:boolean=false
  success:boolean=false
  successResponse!:string
  contactItem:any={}
  @ViewChild('myModal') modal: any;

  dropdownValues!: any[]
  secondDropdownValues!: any[] 
  selectedValue!: string;
  selectedId!: any;

  constructor(private data:DataService,private route:Router) {
      // Initialize filtered accounts with all accounts initially
      this.filteredAccounts = this.accounts;
      this.getAccounts
      this.token=localStorage.getItem('token');
      this.fetchDropdownValues()
  }

  ngOnInit(): void {
      // Retrieve token from localStorage
    this.token = localStorage.getItem('token');
    console.log("token",this.token);
   
    if (this.token) {
      console.log("test");
      this.getAccounts();
    } else {
      this.route.navigate(['/login'])
      // Handle case where token is not available (e.g., redirect to login)
    }
  }

  filterAccounts(event: any) {
    const searchTerm = event.target.value;
    // Filter accounts based on account name
    this.filteredAccounts = this.filteredAccounts.filter(account => {
        return account.AccountDescription.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  getAccounts() {
    this.data.getAccounts(this.token!).subscribe(response => {
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

  addAccount(form:any) {
    this.accountData.mainAccounts = this.selectedId
      const formDataWithToken = { ...form.value, token: this.token };
      console.log(formDataWithToken);
      this.data.addAccount(formDataWithToken).subscribe(response => {
        if(response.message !="Successfully"){
          this.error = true
          this.success=false
          this.errorResponse = response.message
          form.reset()
        }else{
          console.log('Account added successfully:', response);
          // Optionally, refresh account list after adding
          this.getAccounts();
          // Clear form after successful addition
          form.reset();
          this.success = true
            this.error=false
            this.errorResponse=''
            this.successResponse = response.message
            this.modal.hide()
        }
       
      }, error => {
        console.error('Error:', error);
        this.success=false
        this.successResponse=error.message
        this.handleApiError(error);
      });
    
    
  }

  getAccountById(id: number) {
    this.data.getAccountById(this.token!, id).subscribe(response => {      
      this.contactItem=response
    }, error => {
      console.error('Error:', error);
      this.handleApiError(error);
    });
  }

  fetchDropdownValues() {
    this.data.fetchDropdownValues(this.token!).subscribe(values => {      
      this.dropdownValues = values;
    });
  }

  onFirstDropdownChange() {    
   
    this.data.fetchSecondDropdownValues(this.token!,this.selectedId).subscribe(values => {
      
      this.secondDropdownValues = values;
    });
  }





  handleApiError(error: any) {
    if (error.error && (error.error.message === 'Session Is Expired' || error.error.message === 'Token Is Invalid')) {
      // Handle session or token expiration here (e.g., redirect to login)
    }
  }

}
