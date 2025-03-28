import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../app/user/services/product-service/product-service';

interface ProductImage {
  id: number;
  image_url: string | null;
  image: string;
  is_main: boolean;
  caption: string;
  upload_date: string;
  product: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price_per_day: number;
  stock: number;
  category: string;
  gender: string;
  size: string | null;
  color: string | null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  showModal = false;
  editMode = false;
  currentProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price_per_day: 0,
    stock: 0,
    category: '',
    gender: '',
    size: null,
    color: null,
    images: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  selectedFiles: File[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  showAddForm() {
    this.editMode = false;
    this.currentProduct = {
      id: 0,
      name: '',
      description: '',
      price_per_day: 0,
      stock: 0,
      category: '',
      gender: '',
      size: null,
      color: null,
      images: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.showModal = true;
  }

  editProduct(product: Product) {
    this.editMode = true;
    this.currentProduct = { ...product };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentProduct = {
      id: 0,
      name: '',
      description: '',
      price_per_day: 0,
      stock: 0,
      category: '',
      gender: '',
      size: null,
      color: null,
      images: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.selectedFiles = [];
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.currentProduct).forEach(key => {
      formData.append(key, this.currentProduct[key as keyof Product]?.toString() || '');
    });

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    if (this.editMode && this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, formData).subscribe(
        () => {
          this.loadProducts();
          this.closeModal();
        },
        error => console.error('Error updating product:', error)
      );
    } else {
      this.productService.createProduct(formData).subscribe(
        () => {
          this.loadProducts();
          this.closeModal();
        },
        error => console.error('Error creating product:', error)
      );
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts();
        },
        error => console.error('Error deleting product:', error)
      );
    }
  }
}

