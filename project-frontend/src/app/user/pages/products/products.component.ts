import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CommonModule],
  styleUrls: ['./products.component.css']


})
export class ProductsComponent {
  products = [
    {
      name: 'Áo thun nam',
      price: 200000,
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Quần jeans nữ',
      price: 350000,
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Áo khoác mùa đông',
      price: 500000,
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Váy dạ hội',
      price: 800000,
      image: 'https://via.placeholder.com/150'
    }
  ];
}
