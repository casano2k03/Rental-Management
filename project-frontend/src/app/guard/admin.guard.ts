import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    // Kiểm tra xem Angular đang chạy trên trình duyệt
    if (!isPlatformBrowser(this.platformId)) {
      return false; // Nếu đang chạy trên server thì chặn luôn
    }

    // Kiểm tra role trong localStorage
    const isAdmin = localStorage.getItem('role') === 'admin';

    if (!isAdmin) {
      this.router.navigate(['/login']); // Nếu không phải admin thì chuyển hướng về login
      return false;
    }
    return true;
  }
}
