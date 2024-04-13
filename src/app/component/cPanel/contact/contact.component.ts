import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  accounts = [
    { id: '1', contactName: 'CASH', type: 'Asset', email: 'Current Asset',mobile:'', balance: 56 },
    { id: '2', contactName: 'Account Payable', type: 'Liability', email: 'Current Liability', mobile:'',   balance: 85 },
    { id: '3', contactName: 'Retained Earning', type: 'Owner Equity', email: 'Retained Earnings', mobile:'',  balance: 45 },
    { id: '4', contactName: 'Rent Revenue', type: 'Income', email: 'Revenue', mobile:'',  balance: 57 },
    { id: '5', contactName: 'Stationary', type: 'Expenses', email: 'General Expenses', mobile:'',  balance: 29 }
];
  filteredAccounts: any[];
  accountData: any = {};
  token: string | null = null;

  showAdditionalFields: boolean = false;

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

  toggleAdditionalFields(): void {
    this.showAdditionalFields = !this.showAdditionalFields;
  }

  filterAccounts(event: any) {
    const searchTerm = event.target.value;
    // Filter accounts based on account name
    this.filteredAccounts = this.accounts.filter(account => {
        return account.contactName.toLowerCase().includes(searchTerm.toLowerCase());
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

  addAccount(form: any): void {
    form.token = this.token
    if (form.valid) {
      // Submit the form data to the backend API
      const formData = form.value;
      console.log(formData); // For testing, remove this line after testing
      this.data.addAccount(form).subscribe(response => {
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
