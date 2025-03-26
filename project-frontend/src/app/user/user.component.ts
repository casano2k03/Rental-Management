import { Component } from '@angular/core';
import { NavbarComponent } from './component/navbar/navbar.component';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [NavbarComponent, RouterModule]
})
export class UserComponent {

}
