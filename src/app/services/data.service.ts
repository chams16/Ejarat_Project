import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apipriceUrl = 'http://164.90.138.198/api/website/packages'; // Replace with your API endpoint
  private apifaqUrl = 'http://164.90.138.198/api/website/faq';
  private apicityUrl ='http://164.90.138.198/api/app/cities'

  baseUrl = 'http://164.90.138.198/api/app/';
  token: string = ''; // Store token here

  constructor(private http: HttpClient) { }

  fetchPricingData(): Observable<any> {
    return this.http.get<any>(this.apipriceUrl);
  }

  fetchFAqDat(lang: string){
    const url = `${this.apifaqUrl}?lang=${lang}`;
    return this.http.get(url);
    
  }

  fetchpackageData(lang: string){
    const url = `${this.apipriceUrl}?lang=${lang}`;
    return this.http.get(url);
    
  }

  fetchCities(lang: string){
    const url = `${this.apicityUrl}?lang=${lang}`;    
    return this.http.get(url);
  }


  // Get company accounts
  getAccounts(token: string): Observable<any> {
    return this.http.post(this.baseUrl + 'getAccounts', { token });
  }

  // Add account
  addAccount( accountData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'addAccount', accountData );
  }

  // Get account by id
  getAccountById(token: string, id: number): Observable<any> {
    return this.http.post(this.baseUrl + 'getAccountById', { token, id });
  }

  fetchDropdownValues(token: string): Observable<any> {
    return this.http.post(this.baseUrl + 'getMainAccounts', { token });
  }

  fetchSecondDropdownValues(token: string,id: number): Observable<any> {
    // Assuming the API endpoint accepts ID and token as query parameters
    return this.http.post(this.baseUrl + `getSubMainAccounts`, {token,id });
  }


}
