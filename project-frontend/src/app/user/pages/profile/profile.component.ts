import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer, CustomerStats } from '../../../interfaces/customer.interface';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  customer: Customer | null = null;
  stats: CustomerStats | null = null;
  isEditing = false;
  editForm = {
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadStats();
  }

  loadProfile(): void {
    this.customerService.getProfile().subscribe({
      next: (data) => {
        this.customer = data;
        this.editForm = {
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          phone: data.phone,
          address: data.address
        };
      },
      error: (error) => console.error('Error loading profile:', error)
    });
  }

  loadStats(): void {
    this.customerService.getCustomerStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => console.error('Error loading stats:', error)
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (!this.customer) return;

    this.customerService.updateProfile({
      user: {
        ...this.customer.user,
        first_name: this.editForm.first_name,
        last_name: this.editForm.last_name
      },
      phone: this.editForm.phone,
      address: this.editForm.address
    }).subscribe({
      next: (data) => {
        this.customer = data;
        this.isEditing = false;
      },
      error: (error) => console.error('Error saving profile:', error)
    });
  }
}