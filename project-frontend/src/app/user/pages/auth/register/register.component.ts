import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true, // ✅ Standalone Component
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      res => alert('Đăng ký thành công'),
      err => alert('Đăng ký thất bại!')
    );
  }
}
