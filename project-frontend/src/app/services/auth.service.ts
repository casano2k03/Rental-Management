import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiRegisterAccount = 'http://127.0.0.1:8000/api/register/'
  private apiLoginAccount = 'http://127.0.0.1:8000/api/login/'
  private apiUrl = 'http://127.0.0.1:8000/api/'
  private apiLogoutAccount = 'http://127.0.0.1:8000/api/logout'
  
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any>{
    return this.http.post(this.apiRegisterAccount, userData);
  }
  
  login(username: string, password: string): Observable<any> {
    console.log("Calling login API:", this.apiLoginAccount);
    console.log("Sending data:", { username, password });
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
  
    return this.http.post<{ token: string }>(this.apiLoginAccount, body, { headers }).pipe(
      tap(response => {
        console.log("Login response:", response);
        
  
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(username));

          this.isLoggedInSubject.next(true);
        }
      })
    );
  }
  
  
  checkLoginStatus() {
    if (typeof window !== 'undefined') { // Kiểm tra nếu đang chạy trên trình duyệt
      return localStorage.getItem('token') !== null;
    }
    return false;
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
        return new Observable(observer => {
            this.isLoggedInSubject.next(false);
            observer.next(null);
            observer.complete();
        });
    }

    return this.http.post('http://127.0.0.1:8000/api/logout/', {}, {
        headers: { Authorization: `Token ${token}` }
    }).pipe(
        tap(() => {
            localStorage.removeItem('token');
            this.isLoggedInSubject.next(false);
        })
    );
}

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }



}
