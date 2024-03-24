import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiLoginUrl = 'http://164.90.138.198/api/app/login';
  private apisignUpUrl = 'http://164.90.138.198/api/app/registerCompany';

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(this.apisignUpUrl, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiLoginUrl, credentials);
  }
}
