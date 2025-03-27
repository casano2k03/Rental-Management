import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PushmenuComponent } from './components/pushmenu/pushmenu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  imports: [RouterOutlet, PushmenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
  
})
export class AdminComponent {

}
