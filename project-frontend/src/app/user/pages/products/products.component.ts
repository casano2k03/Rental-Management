import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, ProductImage, ProductStatus } from '../../../interfaces/product.interface';
import { ProductService } from '../../services/product-service/product-service';

interface ProductCategory {
  value: string;
  label: string;
}

interface FilterOptions {
  category: string;
  gender: string;
  minPrice: number | null;
  maxPrice: number | null;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  showModal = false;
  availableSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedImage: ProductImage | null = null;

  categories: ProductCategory[] = [
    { value: 'dress', label: 'Váy' },
    { value: 'shirt', label: 'Áo' },
    { value: 'pants', label: 'Quần' },
    { value: 'shoes', label: 'Giày' },
    { value: 'suit', label: 'Bộ vest' },
    { value: 'accessory', label: 'Phụ kiện' }
  ];

  filters: FilterOptions = {
    category: '',
    gender: '',
    minPrice: null,
    maxPrice: null
  };

  constructor(
    private productService: ProductService){}
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe({
      next: (product) => {
        this.products = product;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Category filter
      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      // Gender filter
      if (this.filters.gender && product.gender !== this.filters.gender) {
        return false;
      }

      // Price range filter
      if (this.filters.minPrice && product.price_per_day < this.filters.minPrice) {
        return false;
      }
      if (this.filters.maxPrice && product.price_per_day > this.filters.maxPrice) {
        return false;
      }

      return true;
    });
  }

  resetFilters(): void {
    this.filters = {
      category: '',
      gender: '',
      minPrice: null,
      maxPrice: null
    };
    this.applyFilters();
  }

  getProductImage(product: Product): string {
    if (this.selectedImage) {
      return this.selectedImage.image_url || this.selectedImage.image;
    }
    const mainImage = product.images.find(img => img.is_main) || product.images[0];
    return mainImage ? (mainImage.image_url || mainImage.image ) : 'assets/placeholder.png';

  }
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN',{
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.selectedImage = null;
    this.showModal = true;
    
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void{
    this.showModal = false;
    this.selectedProduct = null;
    document.body.style.overflow = 'unset';


  }

  onModalClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  selectImage(image: ProductImage): void {
    this.selectedImage = image;
  }

  rentProduct(product: Product): void {
    // TODO: Implement rental logic
    console.log('Renting product:', product);
  }

  getStatusLabel(status: ProductStatus): string {
    const statusMap = {
      [ProductStatus.AVAILABLE]: 'Còn hàng',
      [ProductStatus.RENTED]: 'Đang thuê',
      [ProductStatus.CLEANING]: 'Đang giặt',
      [ProductStatus.MAINTENANCE]: 'Đang sửa',
      [ProductStatus.UNAVAILABLE]: 'Hết hàng'
    };
    return statusMap[status] || 'Không xác định';
  }

  getStatusColor(status: ProductStatus): string {
    const colorMap = {
      [ProductStatus.AVAILABLE]: 'bg-green-500',
      [ProductStatus.RENTED]: 'bg-blue-500',
      [ProductStatus.CLEANING]: 'bg-yellow-500',
      [ProductStatus.MAINTENANCE]: 'bg-orange-500',
      [ProductStatus.UNAVAILABLE]: 'bg-red-500'
    };
    return colorMap[status] || 'bg-gray-500';
  }

  isProductAvailable(product: Product): boolean {
    return product.status === ProductStatus.AVAILABLE && product.availableQuantity > 0;
  }
}
