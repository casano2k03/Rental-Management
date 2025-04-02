import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // ✅ Make it standalone
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}