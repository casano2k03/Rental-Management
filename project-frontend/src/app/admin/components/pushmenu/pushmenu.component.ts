import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pushmenu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './pushmenu.component.html',
  styleUrls: ['./pushmenu.component.css']
})
export class PushmenuComponent {

  menuItems = [
    { icon: '📊', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: '👥', label: 'Users', route: '/admin/users' },
    { icon: '📦', label: 'Products', route: '/admin/products' },
    { icon: '📝', label: 'Orders', route: '/admin/orders' },
    { icon: '⚙️', label: 'Settings', route: '/admin/settings' }
  ];

}
