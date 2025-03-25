import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);  // Chuyển hướng về trang chủ nếu đã đăng nhập
      return false;
    }
    return true;  // Nếu chưa đăng nhập, cho phép truy cập
  }
}
