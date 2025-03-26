import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiRegisterAccount = 'http://127.0.0.1:8000/api/register/'
  private apiLoginAccount = 'http://127.0.0.1:8000/api/login/'
  private apiUrl = 'http://127.0.0.1:8000/api/'
  private apiLogoutAccount = 'http://127.0.0.1:8000/api/logout'
  
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any>{
    return this.http.post(this.apiRegisterAccount, userData);
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string; username: string; role: string }>(this.apiLoginAccount, { username, password })
      .pipe(
        tap(response => {
          console.log("API response:", response); // Debug xem API trả về gì
  
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', response.username);
  
            // Đảm bảo lấy đúng role từ API
            const role = response.role || 'user';  
            localStorage.setItem('role', role);
  
            console.log("Saved role:", role);
            this.router.navigate(['/admin']);
          }
        })
      );
  }
  
  
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
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
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            this.isLoggedInSubject.next(false);
        })
    );
}

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }



}
