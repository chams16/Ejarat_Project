import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-account',
  templateUrl: './chart-account.component.html',
  styleUrls: ['./chart-account.component.css']
})
export class ChartAccountComponent {
  accounts = [
    { accCode: '1000', accountName: 'CASH', accountType: 'Asset', subAccount: 'Current Asset', balance: 56 },
    { accCode: '2000', accountName: 'Account Payable', accountType: 'Liability', subAccount: 'Current Liability', balance: 85 },
    { accCode: '3000', accountName: 'Retained Earning', accountType: 'Owner Equity', subAccount: 'Retained Earnings', balance: 45 },
    { accCode: '4000', accountName: 'Rent Revenue', accountType: 'Income', subAccount: 'Revenue', balance: 57 },
    { accCode: '5000', accountName: 'Stationary', accountType: 'Expenses', subAccount: 'General Expenses', balance: 29 }
];
  filteredAccounts: any[];

  constructor() {
      // Initialize filtered accounts with all accounts initially
      this.filteredAccounts = this.accounts;
  }

  filterAccounts(event: any) {
    const searchTerm = event.target.value;
    // Filter accounts based on account name
    this.filteredAccounts = this.accounts.filter(account => {
        return account.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    });
}
}
