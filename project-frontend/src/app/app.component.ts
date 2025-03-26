import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user/component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Thêm CUSTOM_ELEMENTS_SCHEMA ở đây


})
export class AppComponent {
  title = 'project-frontend';

  constructor(private router: Router) {}

  // isAdminRoute(): boolean {
  //   return this.router.url.startsWith('/admin'); // Kiểm tra nếu đang ở route admin
  // }



}
