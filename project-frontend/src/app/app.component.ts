import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // ✅ Fix lỗi (thêm "s")
})
export class AppComponent {
  title = 'project-frontend';

}
