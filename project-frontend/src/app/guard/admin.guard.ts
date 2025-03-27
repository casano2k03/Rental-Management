import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    // Check if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        const isAdmin = localStorage.getItem('role') === 'admin';
        if (!isAdmin) {
          this.router.navigate(['/user']);
          return false;
        }
        return true;
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        this.router.navigate(['/user/login']);
        return false;
      }
    }

    // If we're on the server, deny access and redirect
    this.router.navigate(['/user']);
    return false;
  }
}
