import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.token = res.token;
        localStorage.setItem('token', res.token);
        alert('Login successful!');
      },
      error: (err) => {
        this.error = 'Login failed!';
      }
    });
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.logout(token).subscribe(() => {
        localStorage.removeItem('token');
        this.token = null;
        alert('Logged out!');
      });
    }
  }
}