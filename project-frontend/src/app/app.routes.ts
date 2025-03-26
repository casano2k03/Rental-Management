import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './user/pages/home/home.component';
import { LoginComponent } from './user/pages/auth/login/login.component';
import { RegisterComponent } from './user/pages/auth/register/register.component';
import { ProductsComponent } from './user/pages/products/products.component';
import { PolicyComponent } from './user/pages/policy/policy.component';
import { ForgotPasswordComponent } from './user/pages/auth/forgot-password/forgot-password.component';

export const appRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },

      { path: 'forgot-password', component: ForgotPasswordComponent }, // Route cho Quên mật khẩu

      { path: 'register', component: RegisterComponent },
      { path: 'products', component: ProductsComponent }, // Route cho trang sản phẩm
      { path: 'policy', component: PolicyComponent }, // Route cho trang chính sách


    ],
  },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
];