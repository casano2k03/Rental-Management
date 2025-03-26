import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports:[CommonModule, RouterModule],
    

})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  showLogoutMessage = false;
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  };

  ngOnInit(){
    this.authService.isLoggedIn().subscribe(status =>{
      this.isLoggedIn = status;
      if(status){
        this.user = this.authService.getUserInfo(); // Lấy thông tin user
      }
    });
  }
  logout() {
    this.authService.logout().subscribe(() => {
      console.log("Đăng xuất thành công!");
      this.showLogoutMessage = true; // Hiển thị thông báo

      setTimeout(() => {
        this.showLogoutMessage = false; // Ẩn thông báo sau 3 giây
      }, 3000);
    });
  }
}
