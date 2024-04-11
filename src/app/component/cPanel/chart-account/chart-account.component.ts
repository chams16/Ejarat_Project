import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart-account',
  templateUrl: './chart-account.component.html',
  styleUrls: ['./chart-account.component.css']
})
export class ChartAccountComponent implements OnInit{
  accounts = [
    { accCode: '1000', accountName: 'CASH', accountType: 'Asset', subAccount: 'Current Asset', balance: 56 },
    { accCode: '2000', accountName: 'Account Payable', accountType: 'Liability', subAccount: 'Current Liability', balance: 85 },
    { accCode: '3000', accountName: 'Retained Earning', accountType: 'Owner Equity', subAccount: 'Retained Earnings', balance: 45 },
    { accCode: '4000', accountName: 'Rent Revenue', accountType: 'Income', subAccount: 'Revenue', balance: 57 },
    { accCode: '5000', accountName: 'Stationary', accountType: 'Expenses', subAccount: 'General Expenses', balance: 29 }
];
  filteredAccounts: any[];
  accountData: any = {};
  token: string | null = null;

  constructor(private data:DataService) {
      // Initialize filtered accounts with all accounts initially
      this.filteredAccounts = this.accounts;
  }

  ngOnInit(): void {
      // Retrieve token from localStorage
    this.token = localStorage.getItem('token');
    console.log("token",this.token);
    
    if (this.token) {
      console.log("test");
      
      this.getAccounts();
    } else {
      // Handle case where token is not available (e.g., redirect to login)
    }
  }

  filterAccounts(event: any) {
    const searchTerm = event.target.value;
    // Filter accounts based on account name
    this.filteredAccounts = this.accounts.filter(account => {
        return account.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  getAccounts() {
    this.data.getAccounts(this.token!).subscribe(response => {
     console.log(response);
     
    }, error => {
      console.error('Error:', error);
      this.handleApiError(error);
    });
  }

  addAccount(form:NgForm) {
    console.log(form.value);
    
    if (form.valid) {
      // Submit the form data to the backend API
      const formData = form.value;
      console.log(formData); // For testing, remove this line after testing
      this.data.addAccount(this.token!, this.accountData).subscribe(response => {
        console.log('Account added successfully:', response);
        // Optionally, refresh account list after adding
        this.getAccounts();
        // Clear form after successful addition
        form.reset;
      }, error => {
        console.error('Error:', error);
        this.handleApiError(error);
      });
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
    
  }

  getAccountById(id: number) {
    this.data.getAccountById(this.token!, id).subscribe(response => {
      console.log('Account:', response);
    }, error => {
      console.error('Error:', error);
      this.handleApiError(error);
    });
  }





  handleApiError(error: any) {
    if (error.error && (error.error.message === 'Session Is Expired' || error.error.message === 'Token Is Invalid')) {
      // Handle session or token expiration here (e.g., redirect to login)
    }
  }

}
