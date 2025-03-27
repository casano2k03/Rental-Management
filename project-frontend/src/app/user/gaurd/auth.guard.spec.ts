import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private authService: AuthService,
    
  
  ) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Kiểm tra quyền
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/user']); // Nếu không phải admin, chuyển hướng login
      return false;
    }
  }
}
