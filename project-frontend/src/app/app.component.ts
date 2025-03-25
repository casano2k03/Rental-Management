import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user/component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // ✅ Fix lỗi (thêm "s")
})
export class AppComponent {
  title = 'project-frontend';

  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin'); // Kiểm tra nếu đang ở route admin
  }



}
