import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://164.90.138.198/api/website/guestMsg'; // Replace with your API endpoint
  private apiDemoUrl = 'http://164.90.138.198/api/website/requestDemo'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  sendContactForm(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
  sendDemoForm(formData: any): Observable<any> {
    return this.http.post<any>(this.apiDemoUrl, formData);

  }
}
