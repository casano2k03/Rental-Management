import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiRegisterAccount = 'http://127.0.0.1:8000/api/register/'
  private apiLoginAccount = 'http://127.0.0.1:8000/api/login/'
  private apiUrl = 'http://127.0.0.1:8000/api/'


  
  
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any>{
    return this.http.post(this.apiRegisterAccount, userData);
  }

  login(username: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ username, password });
  
    console.log("📢 Sending login request:", body);  // Debug log
  
    return this.http.post(this.apiLoginAccount, body, { headers });
  }
  
  

  logout(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {}, {
      headers: { 'Authorization': `Token ${token}` }
    });
  }

}
