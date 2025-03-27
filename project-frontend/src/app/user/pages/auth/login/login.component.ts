import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  token: string | null = null;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log("Login function called!");
    console.log("Username:", this.username);
    console.log("Password:", this.password);
  
    if (!this.username || !this.password) {
      this.error = 'Vui lòng nhập tài khoản và mật khẩu!';
      return;
    }
    

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {

        console.log("Login successful:", response);
        alert('Đăng nhập thành công!');

        if(this.authService.isAdmin()) {
          this.router.navigate(['/admin']);

        }else{
          this.router.navigate(['/user']);
        }
      },
      error: (err) => {
        console.log("Login error:", err);
        this.error = 'Đăng nhập thất bại! Kiểm tra lại tài khoản hoặc mật khẩu.';
      }
    });
  }

  loginWithGoogle() {}
  loginWithFacebook() {}
  
}