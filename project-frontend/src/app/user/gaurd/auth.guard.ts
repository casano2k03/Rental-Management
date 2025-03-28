import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);  // Chuyển hướng về trang chủ nếu đã đăng nhập
      return false;
    }if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || role === 'admin'){
        this.router.navigate(['/user/login']);  // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
        return false;
      }
      return true;  // Nếu chưa đăng nhập, cho phép truy cập
    }
    return true;  // Nếu chưa đăng nhập, cho phép truy cập
  }
}
