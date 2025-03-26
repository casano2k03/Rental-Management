import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ForgotPasswordComponent {
  email: string = '';

  sendResetLink() {
    console.log('Gửi liên kết đặt lại mật khẩu đến:', this.email);
    alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!');
  }
}