import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Kiểm tra quyền
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']); // Nếu không phải admin, chuyển hướng login
      return false;
    }
  }
}
