import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home.component';
import { LoginComponent } from './user/pages/auth/login/login.component';
import { RegisterComponent } from './user/pages/auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { AdminGuard } from './guard/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin có layout riêng, không dùng chung AppComponent
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AdminGuard], // Chỉ cho phép admin truy cập
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  },

  { path: '**', redirectTo: '' }, // Nếu route sai, về trang chủ
];
