import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './user/pages/home/home.component';
import { LoginComponent } from './user/pages/auth/login/login.component';
import { RegisterComponent } from './user/pages/auth/register/register.component';
import { ProductsComponent } from './user/pages/products/products.component';
import { PolicyComponent } from './user/pages/policy/policy.component';
import { ForgotPasswordComponent } from './user/pages/auth/forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { ProductManagementComponent } from './admin/pages/product-management/product-management.component';
import { AuthGuard } from './user/gaurd/auth.guard.spec';
import { ProfileComponent } from './user/pages/profile/profile.component';

export const appRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'policy', component: PolicyComponent },

      { path: 'profile',component: ProfileComponent}
    ],
  },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: ProductManagementComponent }
    ]
  }
];