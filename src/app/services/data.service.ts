import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apipriceUrl = 'http://164.90.138.198/api/website/packages'; // Replace with your API endpoint
  private apifaqUrl = 'http://164.90.138.198/api/website/faq';

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
}
